import React, { useRef, useState } from 'react'
import { useJob } from '../context/JobProvider';
import { useAuth } from '../context/AuthProvider';

const AddJob = () => {

    //const [jobsData, setJobsData] = useState([]);
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
    const { addNewJob } = useJob();
    const { token } = useAuth();

    const [formData, setFormData] = useState(
        {
            title: "",
            description: "",
            category: "",
            location: "",
            level: "",
            salary: ""
        }
    );

    const jobTitleRef = useRef(null);
    const jobDescriptionRef = useRef(null);
    const jobCategoryRef = useRef(null);
    const jobLocationRef = useRef(null);
    const jobLevelRef = useRef(null);
    const salaryRef = useRef(null);

    const handleInputChanges = () => {
        setFormData(
            {
                title: jobTitleRef.current.value,
                description: jobDescriptionRef.current.value,
                category: jobCategoryRef.current.value,
                location: jobLocationRef.current.value,
                level: jobLevelRef.current.value,
                salary: salaryRef.current.value
            }
        );
    }

    //To check whether all the data of form is empty
    const isFromDataEmpty = Object.values(formData).every(value => value === '');

    const handleSubmit = (e) => {
        if (isFromDataEmpty) {
            e.preventDefault();
            console.warn("all feilds are required!");
        }
        else if (formData.jobTitle && !formData.jobDescription && !formData.jobCategory && !formData.jobLocation && !formData.jobLevel && !formData.salary) {
            e.preventDefault();
            console.warn("description, category, location, level, and salary are required!");
        }
        else if (formData.jobTitle && formData.jobDescription && !formData.jobCategory && !formData.jobLocation && !formData.jobLevel && !formData.salary) {
            e.preventDefault();
            console.warn("category, location, level, and salary are required!");
        }
        else if (formData.jobTitle && formData.jobDescription && formData.jobCategory && !formData.jobLocation && !formData.jobLevel && !formData.salary) {
            e.preventDefault();
            console.warn("location, level, and salary are required!");
        }
        else if (formData.jobTitle && formData.jobDescription && formData.jobCategory && formData.jobLocation && !formData.jobLevel && !formData.salary) {
            e.preventDefault();
            console.warn("level and salary are required!");
        }
        else if (formData.jobTitle && formData.jobDescription && formData.jobCategory && formData.jobLocation && formData.jobLevel && !formData.salary) {
            e.preventDefault();
            console.warn("salary is required!");
        }
        else {
            e.preventDefault();
            console.log("all fields are completede");

            addNewJob({ ...formData, token: token });
            //setJobsData(prev => ([...prev, formData]));

            //toast.success("New Job Added Successfully");

            setFormData(
                {
                    title: "",
                    description: "",
                    category: "",
                    location: "",
                    level: "",
                    salary: ""
                }
            )
        }
    }

    console.log("JobFormData: ", formData);
    // console.log("TOKEN from AddJob page: ", token);

    return (
        <>
            <form method='POST' onSubmit={handleSubmit}>
                <div className='flex flex-col space-y-2 mb-4'>
                    <label >Job Title</label>
                    <input
                        className={`py-2 px-4 outline-0 ring ${!formData.title && isAddBtnClicked ? 'ring-red-500' : 'ring-gray-300'} rounded-sm  text-gray-500 w-full lg:w-2/3`}
                        type="text"
                        name="jobTitle"
                        placeholder="Type here"
                        value={formData.title}
                        ref={jobTitleRef}
                        onChange={handleInputChanges}
                    />
                </div>

                <div className='flex flex-col space-y-2 mb-4'>
                    <label >Job Description</label>
                    <textarea
                        className={`py-2 px-4 outline-0 ring ${!formData.description && isAddBtnClicked ? 'ring-red-500' : 'ring-gray-300'}  rounded-sm  text-gray-500 w-full lg:w-2/3`}
                        name="jobDescription"
                        placeholder="Type here"
                        value={formData.description}
                        ref={jobDescriptionRef}
                        onChange={handleInputChanges}
                    >
                    </textarea>
                </div>

                <div className='flex items-center gap-4.5 max-lg:gap-5 max-md:flex-col max-lg:items-start mb-4'>
                    <div className='flex flex-col space-y-2 grow lg:grow-0'>
                        <label>Job Category</label>
                        <select className={`py-2 px-4 outline-0 ring ${!formData.category && isAddBtnClicked ? 'ring-red-500' : 'ring-gray-300'} rounded-sm text-gray-500`} ref={jobCategoryRef} onChange={handleInputChanges}>
                            <option value="">Category</option>
                            <option value="Programming">Programming</option>
                            <option value="Cybersecurity">Cybersecurity</option>
                            <option value="Devops">Devops</option>
                            <option value="Fullstack Developer">Fullstack Developer</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Desing">Desgin</option>
                        </select>
                    </div>

                    <div className='flex flex-col space-y-2 grow lg:grow-0'>
                        <label>Job Location</label>
                        <select className={`py-2 px-4 outline-0 ring ${!formData.location && isAddBtnClicked ? 'ring-red-500' : 'ring-gray-300'} rounded-sm text-gray-500`} ref={jobLocationRef} onChange={handleInputChanges}>
                            <option value="">Location</option>
                            <option value="London">London</option>
                            <option value="Australia">Australia</option>
                            <option value="USA">USA</option>
                            <option value="Canada">Canada</option>
                        </select>
                    </div>

                    <div className='flex flex-col space-y-2 grow lg:grow-0'>
                        <label>Job Level</label>
                        <select className={`py-2 px-4 outline-0 ring ${!formData.level && isAddBtnClicked ? 'ring-red-500' : 'ring-gray-300'} rounded-sm text-gray-500`} ref={jobLevelRef} onChange={handleInputChanges}>
                            <option value="">Level</option>
                            <option value="Senier Level">Senier Level</option>
                            <option value="Beginner Level">Beginner Level</option>
                        </select>
                    </div>
                </div>

                <div className='flex flex-col space-y-2 mb-4'>
                    <label >Salary</label>
                    <input
                        className={`py-2 px-4 w-full  md:w-1/7 outline-0 ring ${!formData.salary && isAddBtnClicked ? 'ring-red-500' : 'ring-gray-300'} rounded-sm  text-gray-500`}
                        type="number"
                        name=""
                        id=""
                        min={0}
                        placeholder="0"
                        value={formData.salary}
                        ref={salaryRef}
                        onChange={handleInputChanges}
                    />
                </div>

                <button className='p-2 px-8 bg-gray-800 hover:bg-gray-900 text-white mt-3 cursor-pointer rounded' type="submit" onClick={() => setIsAddBtnClicked(true)}>ADD</button>
            </form>
        </>
    )
}

export default AddJob