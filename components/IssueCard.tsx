"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import type { Issue, Status } from "@/lib/types";
import { STATUSES } from "@/lib/types";

interface Props {
  issue: Issue;
  onStatusChange: (id: string, status: Status) => void;
}

export default function IssueCard({ issue, onStatusChange }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: issue.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 mb-2 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow ${isDragging ? "opacity-50 ring-2 ring-blue-400" : ""}`}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start gap-2">
        <GripVertical size={14} className="text-gray-300 dark:text-gray-600 mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-sm text-gray-900 dark:text-gray-100 mb-2 leading-snug">
            {issue.title}
          </div>
          <select
            value={issue.status}
            onPointerDown={(e) => e.stopPropagation()}
            onChange={(e) => onStatusChange(issue.id, e.target.value as Status)}
            className="w-full text-xs px-2 py-1 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {STATUSES.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
