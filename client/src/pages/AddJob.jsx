// import { useRef, useState } from 'react'
// import { useJob } from '../context/JobProvider';

// const AddJob = () => {

//     const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
//     const { addNewJob } = useJob();

//     const [formData, setFormData] = useState(
//         {
//             title: "",
//             description: "",
//             category: "",
//             location: "",
//             level: "",
//             salary: ""
//         }
//     );

//     const jobTitleRef = useRef(null);
//     const jobDescriptionRef = useRef(null);
//     const jobCategoryRef = useRef(null);
//     const jobLocationRef = useRef(null);
//     const jobLevelRef = useRef(null);
//     const salaryRef = useRef(null);

//     const handleInputChanges = () => {
//         setFormData(
//             {
//                 title: jobTitleRef.current.value,
//                 description: jobDescriptionRef.current.value,
//                 category: jobCategoryRef.current.value,
//                 location: jobLocationRef.current.value,
//                 level: jobLevelRef.current.value,
//                 salary: salaryRef.current.value
//             }
//         );
//     }

//     //To check whether all the data of form is empty
//     const isFromDataEmpty = Object.values(formData).every(value => value === '');

//     const handleSubmit = (e) => {
//         if (isFromDataEmpty) {
//             e.preventDefault();
//             console.warn("all feilds are required!");
//         }
//         else if (formData.jobTitle && !formData.jobDescription && !formData.jobCategory && !formData.jobLocation && !formData.jobLevel && !formData.salary) {
//             e.preventDefault();
//             console.warn("description, category, location, level, and salary are required!");
//         }
//         else if (formData.jobTitle && formData.jobDescription && !formData.jobCategory && !formData.jobLocation && !formData.jobLevel && !formData.salary) {
//             e.preventDefault();
//             console.warn("category, location, level, and salary are required!");
//         }
//         else if (formData.jobTitle && formData.jobDescription && formData.jobCategory && !formData.jobLocation && !formData.jobLevel && !formData.salary) {
//             e.preventDefault();
//             console.warn("location, level, and salary are required!");
//         }
//         else if (formData.jobTitle && formData.jobDescription && formData.jobCategory && formData.jobLocation && !formData.jobLevel && !formData.salary) {
//             e.preventDefault();
//             console.warn("level and salary are required!");
//         }
//         else if (formData.jobTitle && formData.jobDescription && formData.jobCategory && formData.jobLocation && formData.jobLevel && !formData.salary) {
//             e.preventDefault();
//             console.warn("salary is required!");
//         }
//         else {
//             e.preventDefault();
//             console.log("all fields are completede");

//             addNewJob({ ...formData, token: token });

//             setFormData(
//                 {
//                     title: "",
//                     description: "",
//                     category: "",
//                     location: "",
//                     level: "",
//                     salary: ""
//                 }
//             )
//         }
//     }




//     return (
//         <>
//             <form onSubmit={handleSubmit}>
//                 <div className='flex flex-col space-y-2 mb-4'>
//                     <label >Job Title</label>
//                     <input
//                         className={`py-2 px-4 outline-0 ring ${!formData.title && isAddBtnClicked ? 'ring-red-500' : 'ring-gray-300'} rounded-sm  text-gray-500 w-full lg:w-2/3`}
//                         type="text"
//                         name="jobTitle"
//                         placeholder="Type here"
//                         value={formData.title}
//                         ref={jobTitleRef}
//                         onChange={handleInputChanges}
//                     />
//                 </div>

//                 <div className='flex flex-col space-y-2 mb-4'>
//                     <label >Job Description</label>
//                     <textarea
//                         className={`py-2 px-4 outline-0 ring ${!formData.description && isAddBtnClicked ? 'ring-red-500' : 'ring-gray-300'}  rounded-sm  text-gray-500 w-full lg:w-2/3`}
//                         name="jobDescription"
//                         placeholder="Type here"
//                         value={formData.description}
//                         ref={jobDescriptionRef}
//                         onChange={handleInputChanges}
//                     >
//                     </textarea>
//                 </div>

//                 <div className='flex items-center gap-4.5 max-lg:gap-5 max-md:flex-col max-lg:items-start mb-4'>
//                     <div className='flex flex-col space-y-2 grow lg:grow-0'>
//                         <label>Job Category</label>
//                         <select className={`py-2 px-4 outline-0 ring ${!formData.category && isAddBtnClicked ? 'ring-red-500' : 'ring-gray-300'} rounded-sm text-gray-500`} ref={jobCategoryRef} onChange={handleInputChanges}>
//                             <option value="">Category</option>
//                             <option value="Programming">Programming</option>
//                             <option value="Cybersecurity">Cybersecurity</option>
//                             <option value="Devops">Devops</option>
//                             <option value="Fullstack Developer">Fullstack Developer</option>
//                             <option value="Data Science">Data Science</option>
//                             <option value="Desing">Desgin</option>
//                         </select>
//                     </div>

//                     <div className='flex flex-col space-y-2 grow lg:grow-0'>
//                         <label>Job Location</label>
//                         <select className={`py-2 px-4 outline-0 ring ${!formData.location && isAddBtnClicked ? 'ring-red-500' : 'ring-gray-300'} rounded-sm text-gray-500`} ref={jobLocationRef} onChange={handleInputChanges}>
//                             <option value="">Location</option>
//                             <option value="London">London</option>
//                             <option value="Australia">Australia</option>
//                             <option value="USA">USA</option>
//                             <option value="Canada">Canada</option>
//                         </select>
//                     </div>

//                     <div className='flex flex-col space-y-2 grow lg:grow-0'>
//                         <label>Job Level</label>
//                         <select className={`py-2 px-4 outline-0 ring ${!formData.level && isAddBtnClicked ? 'ring-red-500' : 'ring-gray-300'} rounded-sm text-gray-500`} ref={jobLevelRef} onChange={handleInputChanges}>
//                             <option value="">Level</option>
//                             <option value="Senier Level">Senier Level</option>
//                             <option value="Beginner Level">Beginner Level</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div className='flex flex-col space-y-2 mb-4'>
//                     <label >Salary</label>
//                     <input
//                         className={`py-2 px-4 w-full  md:w-1/7 outline-0 ring ${!formData.salary && isAddBtnClicked ? 'ring-red-500' : 'ring-gray-300'} rounded-sm  text-gray-500`}
//                         type="number"
//                         name=""
//                         id=""
//                         min={0}
//                         placeholder="0"
//                         value={formData.salary}
//                         ref={salaryRef}
//                         onChange={handleInputChanges}
//                     />
//                 </div>

//                 <button className='p-2 px-8 bg-gray-800 hover:bg-gray-900 text-white mt-3 cursor-pointer rounded' type="submit" onClick={() => setIsAddBtnClicked(true)}>ADD</button>
//             </form>
//         </>
//     )
// }

// export default AddJob




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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 verflow-y-auto">

            {/* Job Basics */}
            <div className="section">
                <h3 className="text-lg font-semibold mb-4">Job Basics</h3>

                <label className="label">Job Title</label>
                <input className="input" placeholder="e.g. Frontend Developer" {...register("title")} />
                <p className="error">{errors.title?.message}</p>

                <label className="label mt-4">Job Description</label>
                <textarea
                    rows={4}
                    className="input resize-none"
                    placeholder="Describe the role, expectations, and impact"
                    {...register("description")}
                />
                <p className="error">{errors.description?.message}</p>
            </div>

            {/* Job Details */}
            <div className="section">
                <h3 className="text-lg font-semibold mb-4">Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select className="input" {...register("category")}>
                        <option value="">Category</option>
                        <option value="Programming">Programming</option>
                        <option value="Devops">DevOps</option>
                        <option value="Devops">Data Science</option>
                        <option value="Devops">Design</option>
                    </select>

                    <select className="input" {...register("location")}>
                        <option value="">Location</option>
                        <option value="USA">USA</option>
                        <option value="Canada">Canada</option>
                        <option value="Canada">UK</option>
                        <option value="Canada">Australia</option>
                        <option value="Canada">Remote</option>
                    </select>

                    <select className="input" {...register("level")}>
                        <option value="">Level</option>
                        <option value="Junior">Junior</option>
                        <option value="Senior">Senior</option>
                    </select>
                </div>

                <label className="label mt-4">Salary</label>
                <input
                    type="number"
                    className="input"
                    placeholder="Monthly or Annual salary"
                    {...register("salary", { valueAsNumber: true })}
                />
            </div>

            {/* Required Skills */}
            <div className="section">
                <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
                <p className="text-sm text-gray-500 mb-3">
                    Add skills candidates must have
                </p>

                {skillsField.fields.map((_, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                        <input
                            className="input flex-1"
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
            <div className="section">
                <h3 className="text-lg font-semibold mb-2">Key Responsibilities</h3>

                {responsibilitiesField.fields.map((_, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                        <input
                            className="input flex-1"
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
                    className="px-8 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? <Loader className="text-white animate-spin" /> : "Publish Job"}
                </button>
            </div>

        </form>
    );
};

export default AddJob;
