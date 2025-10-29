import { Input, Button, Select, SelectItem } from "@heroui/react";
import { IoIosSearch } from "react-icons/io";
import { FiBell, FiFilter, FiPlus } from "react-icons/fi";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FaRegUserCircle } from "react-icons/fa";

type Priority = {
  key: string;
  label: string;
  color: string;
};

type Task = {
  id: number;
  category: string;
  title: string;
  due: string;
  priority: string;
  completed: boolean;
};

export default function TodayPage() {
  const priorities: Priority[] = [
    { key: "high", label: "High", color: "bg-red-100 text-red-600" },
    { key: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-600" },
    { key: "low", label: "Low", color: "bg-blue-100 text-blue-600" },
  ];

  const tasks: Task[] = [
    {
      id: 1,
      category: "Work",
      title: "Design the new landing page",
      due: "Today",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      category: "Work",
      title: "Finalize Q3 report and send for review",
      due: "Apr 25",
      priority: "medium",
      completed: false,
    },
    {
      id: 3,
      category: "Work",
      title: "Schedule a team meeting for project kickoff",
      due: "Apr 20",
      priority: "low",
      completed: true,
    },
    {
      id: 4,
      category: "Personal",
      title: "Book flight tickets for vacation",
      due: "May 01",
      priority: "low",
      completed: false,
    },
  ];

  const groupedTasks = {
    Work: tasks.filter((t) => t.category === "Work"),
    Personal: tasks.filter((t) => t.category === "Personal"),
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* ====== TOP BAR ====== */}
      <header className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 py-4 bg-white shadow-sm gap-4">
        {/* Search Input */}
        <div className="w-full md:w-1/2 lg:w-1/3">
          <Input
            startContent={<IoIosSearch className="text-lg text-gray-400" />}
            type="search"
            placeholder="Search tasks..."
            className="w-full"
          />
        </div>

        {/* Profile & Notification */}
        <div className="flex items-center gap-4">
          <FiBell className="text-gray-500 text-xl cursor-pointer" />
          <div className="flex items-center gap-2">
            <FaRegUserCircle className="text-2xl text-gray-600" />
            <div className="hidden sm:block">
              <p className="font-semibold text-sm">Jane Doe</p>
              <p className="text-xs text-gray-500 cursor-pointer">Logout</p>
            </div>
          </div>
        </div>
      </header>

      {/* ====== MAIN CONTENT ====== */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* ====== Header & Add Button ====== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Today</h1>
            <p className="text-gray-500 text-sm sm:text-base">
              Wednesday, April 17
            </p>
          </div>

          <Button
            color="primary"
            startContent={<FiPlus />}
            className="rounded-lg font-semibold w-full sm:w-auto"
          >
            Add New Task
          </Button>
        </div>

        {/* ====== FILTERS ====== */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-10">
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Select
              className="w-full sm:w-40 font-semibold"
              placeholder="Category"
              startContent={<HiArrowsUpDown />}
            >
              <SelectItem key="work">Work</SelectItem>
              <SelectItem key="personal">Personal</SelectItem>
            </Select>

            <Button
              variant="bordered"
              startContent={<FiFilter />}
              className="text-gray-600 border-gray-300 w-full sm:w-auto font-semibold"
            >
              Filter
            </Button>
          </div>

          <Select
            className="w-full sm:w-44 font-semibold"
            placeholder="Sort by: Priority"
            startContent={<HiArrowsUpDown />}
          >
            {priorities.map((p: Priority) => (
              <SelectItem key={p.key}>{p.label}</SelectItem>
            ))}
          </Select>
        </div>

        {/* ====== TASK LISTS ====== */}
        <section className="space-y-10">
          {/* Work Section */}
          <div>
            <h2 className="font-semibold text-lg mb-3">
              Work ({groupedTasks.Work.length})
            </h2>
            <div className="space-y-3">
              {groupedTasks.Work.map((task) => (
                <TaskCard key={task.id} task={task} priorities={priorities} />
              ))}
            </div>
          </div>

          {/* Personal Section */}
          <div>
            <h2 className="font-semibold text-lg mb-3">
              Personal ({groupedTasks.Personal.length})
            </h2>
            <div className="space-y-3">
              {groupedTasks.Personal.map((task) => (
                <TaskCard key={task.id} task={task} priorities={priorities} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ====== Task Card Component ====== */
function TaskCard({
  task,
  priorities,
}: {
  task: Task;
  priorities: Priority[];
}) {
  const priorityColor =
    priorities.find((p) => p.key === task.priority)?.color || "bg-gray-100";

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md ${
        task.completed ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start sm:items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          readOnly
          className="mt-1 sm:mt-0 cursor-pointer"
        />
        <div>
          <p
            className={`font-medium text-sm sm:text-base ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {task.title}
          </p>
          <p className="text-xs sm:text-sm text-gray-500">Due: {task.due}</p>
        </div>
      </div>
      <span
        className={`text-xs sm:text-sm px-3 py-1 rounded-full font-medium text-center self-start sm:self-auto ${priorityColor}`}
      >
        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
      </span>
    </div>
  );
}
