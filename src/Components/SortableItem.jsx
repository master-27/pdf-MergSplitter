import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  return (
    <li ref={setNodeRef} {...attributes} {...listeners} className="cursor-grab p-2 border rounded flex justify-between items-center bg-gray-200"
      style={{ transform: CSS.Transform.toString(transform), transition }}>
      {children}
    </li>
  );
}
