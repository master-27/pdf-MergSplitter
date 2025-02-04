# 📄 PDF Tools: Merge & Split PDFs

A web-based **PDF utility tool** that allows users to **merge multiple PDFs** into one and **split a PDF** into separate files.

## ✨ Features
- 📌 **Merge PDFs** - Upload multiple PDFs and merge them into a single document.
- ✂️ **Split PDFs** - Select specific pages to extract from a PDF.
- 📥 **Download processed PDFs**.
- 🚀 **Drag & Drop Interface** for easy file selection.
- 🌟 **Real-time preview & reordering of PDFs before merging**.
- 🔥 **Fast processing using Node.js & PDF-Lib**.

---

## 🚀 Tech Stack
### **Frontend**
- **React.js** (Vite for fast performance)
- **Tailwind CSS** (for modern styling)
- **React Dropzone** (for drag-and-drop file uploads)
- **DND-Kit** (for PDF reordering)
- **Axios** (for API requests)

### **Backend**
- **Node.js & Express.js** (server)
- **Multer** (for handling file uploads)
- **PDF-Lib** (for merging & splitting PDFs)
- **JSZip** (for zipping split PDFs)
- **Cors & dotenv** (for security and configuration)

---

## 🛠️ Setup & Installation

### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/YOUR_USERNAME/pdf-tools.git
cd pdf-tools
```

### 2️⃣ **Backend Setup**
```bash
cd backend
npm install
```

### 3️⃣ **Run the Backend**
```bash
node server.js
```
_Backend starts on: **`http://localhost:5000`**_

---

### 4️⃣ **Frontend Setup**
```bash
cd frontend
npm install
```

### 5️⃣ **Run the Frontend**
```bash
npm run dev
```
_App runs on: **`http://localhost:5173`**_

---

## 📌 How to Use?
### **1️⃣ Merge PDFs**
1. Click the **"Merge PDFs"** option.
2. Upload multiple PDFs using **drag & drop**.
3. **Reorder the PDFs** as needed.
4. Click **"Merge"** and download the final PDF.

### **2️⃣ Split PDFs**
1. Click the **"Split PDF"** option.
2. Upload a **single PDF file**.
3. **Enter page numbers** to extract (e.g., `1,3,5-7`).
4. Click **"Split"** to get **individual PDFs in a ZIP file**.

---

## 🔥 API Endpoints
### **1️⃣ Upload & Merge PDFs**
**POST** `/merge`  
_Send multiple PDFs & receive a merged PDF._  
_Response:_ **Merged PDF file (Downloadable)**

### **2️⃣ Upload & Split PDFs**
**POST** `/split`  
_Send a PDF and specify page numbers to extract._  
_Response:_ **ZIP file containing extracted pages.**

---

## 🎯 Future Enhancements
- 📌 **Password-protected PDF support**.
- 📌 **PDF Compression** for reducing file size.
- 📌 **Extract images & text from PDFs**.

---

## 📝 License
This project is **MIT Licensed**.

---

## 👨‍💻 Author & Credits
- **Developed by:** [Mohit kumar sharma](https://github.com/master-27)
- **PDF-Lib** - PDF Processing
- **JSZip** - Zip file creation

---

## ⭐ Contributions & Support
💡 Feel free to **fork this repo** and submit a **pull request**!  
📧 For any queries, contact: **mohitkandwalkaku@gmail.com**

---
🚀 **Now, you're all set to build & deploy!**  
```
