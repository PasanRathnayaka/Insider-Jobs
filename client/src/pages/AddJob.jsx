import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Plus, X } from "lucide-react";
import { useAddJob } from "../hooks/useAddJob";
import { addJobSchema } from "../schemas/addJobSchema";

const AddJob = () => {
    const { mutate: addJob, loading } = useAddJob();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(addJobSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            location: "",
            level: "",
            salary: "",
            skills: [""],
            responsibilities: [""],
        },
    });

    const skillsField = useFieldArray({ control, name: "skills" });
    const responsibilitiesField = useFieldArray({
        control,
        name: "responsibilities",
    });

    const onSubmit = async (data) => {
        addJob(data);
        reset();
    };




    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 overflow-y-auto">

            {/* Job Basics */}
            <div className="bg-white p-5 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Job Basics</h3>

                <div className="flex flex-col space-y-3">
                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1">Job Title</label>
                        <input
                            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. Frontend Developer"
                            {...register("title")}
                        />
                        <p className="text-sm text-red-500 mt-1">{errors.title?.message}</p>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1 mt-4">Job Description</label>
                        <textarea
                            rows={4}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            placeholder="Describe the role, expectations, and impact"
                            {...register("description")}
                        />
                        <p className="text-sm text-red-500 mt-1">{errors.description?.message}</p>
                    </div>
                </div>
            </div>

            {/* Job Details */}
            <div className="bg-white p-5 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Details</h3>

                <div className="flex flex-col space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <select
                            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("category")}
                        >
                            <option value="">Category</option>
                            <option value="Programming">Programming</option>
                            <option value="Devops">DevOps</option>
                            <option value="Devops">Data Science</option>
                            <option value="Devops">Design</option>
                        </select>

                        <select
                            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("location")}
                        >
                            <option value="">Location</option>
                            <option value="USA">USA</option>
                            <option value="Canada">Canada</option>
                            <option value="Canada">UK</option>
                            <option value="Canada">Australia</option>
                            <option value="Canada">Remote</option>
                        </select>

                        <select
                            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("level")}
                        >
                            <option value="">Level</option>
                            <option value="Junior">Junior</option>
                            <option value="Senior">Senior</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600 mb-1 mt-4">Salary</label>
                        <input
                            type="number"
                            min={0}
                            className="w-sm rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Monthly or Annual salary"
                            {...register("salary", { valueAsNumber: true })}
                        />
                    </div>
                </div>
            </div>

            {/* Required Skills */}
            <div className="bg-white p-5 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
                <p className="text-sm text-gray-500 mb-3">
                    Add skills candidates must have
                </p>

                {skillsField.fields.map((_, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                        <input
                            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                            placeholder="e.g. React, Node.js"
                            {...register(`skills.${index}`)}
                        />

                        {skillsField.fields.length > 1 && (
                            <button
                                type="button"
                                onClick={() => skillsField.remove(index)}
                                className="p-2 rounded-full hover:bg-red-50 text-red-500"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                ))}

                <button
                    type="button"
                    onClick={() => skillsField.append("")}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mt-2 cursor-pointer"
                >
                    <Plus size={16} /> Add Skill
                </button>
            </div>

            {/* Responsibilities */}
            <div className="bg-white p-5 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-2">Key Responsibilities</h3>

                {responsibilitiesField.fields.map((_, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                        <input
                            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                            placeholder="What will the candidate do?"
                            {...register(`responsibilities.${index}`)}
                        />

                        {responsibilitiesField.fields.length > 1 && (
                            <button
                                type="button"
                                onClick={() => responsibilitiesField.remove(index)}
                                className="p-2 rounded-full hover:bg-red-50 text-red-500"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                ))}

                <button
                    type="button"
                    onClick={() => responsibilitiesField.append("")}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mt-2 cursor-pointer"
                >
                    <Plus size={16} /> Add Responsibility
                </button>
            </div>

            {/* Submit */}
            <div className="flex justify-end my-10">
                <button
                    disabled={loading}
                    className="px-8 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                >
                    {loading ? <Loader className="text-white animate-spin" /> : "Publish Job"}
                </button>
            </div>

        </form>
    );
};

export default AddJob;
