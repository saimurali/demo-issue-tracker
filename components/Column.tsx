"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Inbox, Circle, Timer, CircleCheck } from "lucide-react";
import type { Issue, Status } from "@/lib/types";
import IssueCard from "./IssueCard";

interface Props {
  status: Status;
  label: string;
  issues: Issue[];
  onStatusChange: (id: string, status: Status) => void;
}

const STATUS_CONFIG: Record<
  Status,
  { Icon: React.ElementType; iconClass: string; accentClass: string }
> = {
  backlog: {
    Icon: Inbox,
    iconClass: "text-slate-400",
    accentClass: "border-l-slate-300 dark:border-l-slate-600",
  },
  todo: {
    Icon: Circle,
    iconClass: "text-blue-400",
    accentClass: "border-l-blue-400",
  },
  in_progress: {
    Icon: Timer,
    iconClass: "text-amber-400",
    accentClass: "border-l-amber-400",
  },
  done: {
    Icon: CircleCheck,
    iconClass: "text-green-400",
    accentClass: "border-l-green-400",
  },
};

export default function Column({ status, label, issues, onStatusChange }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const { Icon, iconClass, accentClass } = STATUS_CONFIG[status];

  return (
    <div
      ref={setNodeRef}
      className={`rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 min-h-80 border-l-4 ${accentClass} transition-shadow ${isOver ? "ring-2 ring-blue-400 ring-inset" : ""}`}
    >
      <h2 className="flex items-center justify-between mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1.5">
          <Icon size={13} className={iconClass} />
          {label}
        </span>
        <span className="font-normal text-gray-400 dark:text-gray-500">{issues.length}</span>
      </h2>
      <SortableContext items={issues.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        {issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} onStatusChange={onStatusChange} />
        ))}
      </SortableContext>
      {issues.length === 0 && (
        <div className="text-xs text-gray-400 dark:text-gray-600 text-center py-6">No issues</div>
      )}
    </div>
  );
}
