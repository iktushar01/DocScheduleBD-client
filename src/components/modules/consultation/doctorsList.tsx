"use client";

import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "@/app/(commonLayout)/consultation/_actions";

const DoctorsList = () => {
  const { data } = useQuery({
    queryKey: ["doctors"],
    queryFn: () => getDoctors(),
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Doctors List</h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.data?.map((doctor: any) => (
          
          <div
            key={doctor.id}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"
          >
            {/* Name */}
            <h2 className="text-lg font-bold mb-1">
              {doctor.name}
            </h2>

            {/* Designation */}
            <p className="text-sm text-gray-600 mb-2">
              {doctor.designation}
            </p>

            {/* Workplace */}
            <p className="text-sm text-gray-500 mb-2">
              {doctor.currentWorkingPlace}
            </p>

            {/* Experience */}
            <p className="text-sm mb-1">
              Experience: {doctor.experience} years
            </p>

            {/* Fee */}
            <p className="text-sm font-semibold text-blue-600">
              Fee: ৳{doctor.appointmentFee}
            </p>

            {/* Button (optional but useful) */}
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
              Book Appointment
            </button>
          </div>

        ))}
      </div>
    </div>
  );
};

export default DoctorsList;