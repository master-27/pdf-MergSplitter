const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const archiver = require("archiver");
const { PDFDocument } = require("pdf-lib");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("PDF Backend is running!");
});


//api to split files.
app.post("/split", upload.single("file"), async (req, res) => {
    try {
        const filePath = req.file.path;
        const pdfBytes = fs.readFileSync(filePath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const totalPages = pdfDoc.getPageCount();

        let { pages } = req.body; 
        if (!pages) return res.status(400).json({ error: "No pages specified." });

        let pageNumbers = parsePageSelection(pages, totalPages);
        if (pageNumbers.length === 0) return res.status(400).json({ error: "Invalid page range." });

        // Create a directory for storing split PDFs
        const splitDir = "uploads/split-pdfs";
        if (!fs.existsSync(splitDir)) fs.mkdirSync(splitDir);

        let splitFiles = [];
        for (let pageNumber of pageNumbers) {
            const newPdf = await PDFDocument.create();
            const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageNumber - 1]);
            newPdf.addPage(copiedPage);
            const newPdfBytes = await newPdf.save();
            const outputFileName = `${splitDir}/split-page-${pageNumber}.pdf`;
            fs.writeFileSync(outputFileName, newPdfBytes);
            splitFiles.push(outputFileName);
        }

        // Create ZIP file
        const zipFilePath = "uploads/split-pdfs.zip";
        const output = fs.createWriteStream(zipFilePath);
        const archive = require("archiver")("zip", { zlib: { level: 9 } });

        archive.pipe(output);
        splitFiles.forEach(file => archive.file(file, { name: file.split("/").pop() }));
        await archive.finalize();

        output.on("close", () => {
            res.set({
                "Content-Type": "application/zip",
                "Content-Disposition": `attachment; filename="split-pdfs.zip"`
            });
            res.download(zipFilePath, "split-pdfs.zip", () => {
                // Clean up files after download
                fs.rmSync(splitDir, { recursive: true, force: true });
                fs.unlinkSync(zipFilePath);
                fs.unlinkSync(filePath);
            });
        });
    } catch (error) {
        console.error("Error splitting PDF:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


//api to merge files.
app.post("/merge", upload.array("files", 10), async (req, res) => {
    try {
        const mergedPdf = await PDFDocument.create();

        for (let file of req.files) {
            const pdfBytes = fs.readFileSync(file.path);
            const pdfDoc = await PDFDocument.load(pdfBytes);
            const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }

        const mergedPdfBytes = await mergedPdf.save();
        const outputFileName = "uploads/merged.pdf";
        fs.writeFileSync(outputFileName, mergedPdfBytes);

        res.download(outputFileName, "merged.pdf", () => {
            // Cleanup files after download
            req.files.forEach(file => fs.unlinkSync(file.path));
            fs.unlinkSync(outputFileName);
        });
    } catch (error) {
        console.error("Error merging PDFs:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


//function to validate range for splitting.
function parsePageSelection(input, totalPages) {
    let pages = new Set();
    let parts = input.split(",");

    for (let part of parts) {
        if (part.includes("-")) {
            let [start, end] = part.split("-").map(Number);
            if (start > 0 && end <= totalPages && start <= end) {
                for (let i = start; i <= end; i++) {
                    pages.add(i);
                }
            }
        } else {
            let page = Number(part);
            if (page > 0 && page <= totalPages) {
                pages.add(page);
            }
        }
    }
    return [...pages].sort((a, b) => a - b);
}

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
