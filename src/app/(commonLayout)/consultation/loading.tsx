import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
      </h1>

      {/* SAME GRID AS REAL UI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {/* Repeat skeleton cards */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-5 space-y-3"
          >
            {/* Name */}
            <Skeleton className="h-5 w-3/4 rounded-md" />

            {/* Designation */}
            <Skeleton className="h-4 w-1/2 rounded-md" />

            {/* Workplace */}
            <Skeleton className="h-4 w-2/3 rounded-md" />

            {/* Experience */}
            <Skeleton className="h-4 w-1/3 rounded-md" />

            {/* Fee */}
            <Skeleton className="h-4 w-1/4 rounded-md" />

            {/* Button */}
            <Skeleton className="h-10 w-full rounded-xl mt-4" />
          </div>
        ))}

      </div>
    </div>
  );
};

export default Loading;