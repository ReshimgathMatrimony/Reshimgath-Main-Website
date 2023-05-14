// @ts-nocheck 
import React from 'react'
import '../Details/BasicInfo.css'
import heightData from '../height.json'
import educationData from '../education.json'
import religionData from '../religion.json'
import RedNav from '../../RedNav'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import AuthContext from '../../ContextCreation/AuthContext/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BasicInfo = () => {
    const notify = (p, msg) => p ? toast.success(msg) : toast.error(msg);
    const authContext = useContext(AuthContext)
    const [countriesName, setCountriesName] = useState('')

    // Fetching All countries
    const [country, setCountry] = useState([])
    useEffect(() => {
        axios.get('https://api.countrystatecity.in/v1/countries', {
            headers: {
                'X-CSCAPI-KEY': 'MGZMRlZLbkZ0SmNiOGkxQzBlREFLYjBKdlZZU1BnRmlRbGI3N2lvVg=='
            }
        }).then((res) => {
            setCountry(res.data)
        }).catch((err) => { console.log(err) })
    }, [])

    // Fetching States By Country
    const [stateData, setStateData] = useState([])

    const handleCountry = (e) => {

        setCountriesName(e.target.value)

        axios.get(`https://api.countrystatecity.in/v1/countries/${e.target.value}/states`, {
            headers: {
                'X-CSCAPI-KEY': 'MGZMRlZLbkZ0SmNiOGkxQzBlREFLYjBKdlZZU1BnRmlRbGI3N2lvVg=='
            }
        }).then((res) => {
            setStateData(res.data)

        }).catch((err) => { })
    }

    // Fetching Cities by state
    const [cityData, setCityData] = useState([])

    const handleState = (event) => {

        axios.get(`https://api.countrystatecity.in/v1/countries/${countriesName}/states/${event.target.value}/cities`, {
            headers: {
                'X-CSCAPI-KEY': 'MGZMRlZLbkZ0SmNiOGkxQzBlREFLYjBKdlZZU1BnRmlRbGI3N2lvVg=='
            }
        }).then((res) => {
            setCityData(res.data)
        }).catch((err) => { })

    }

    //Converting Image into String using image formator
    const imageFormator = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                resolve(reader.result)
            }
        })
    }

    //Geeting Basic Form Data
    const navigate = useNavigate();

    const handleBasicInfo = async (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target);
        const data = Object.fromEntries(formdata.entries());

        const payload = { ...data, image1: await imageFormator(data.image1), image2: await imageFormator(data.image2), image3: await imageFormator(data.image3) }

        axios.post(`${process.env.REACT_APP_BASEURL}/auth/getbasicinfouser`, payload, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('accesstoken')
            }
        }).then((res) => {
            if (res.status === 200) {
                localStorage.setItem('datatoken', res.data.datatoken)
                authContext.dataDispatch({ type: 'changeState' })
                navigate('/familyinfo')
            }
        }).catch((err) => {
            notify(0, "Something went wrong..!")
        })


    }

    return (
        <>
            <RedNav />
            <div className="container Basic_info_container">
                <div className="row">
                    <h1 className="basic_info_title">Basic Information</h1>
                </div>
                <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
                {/* <h1>{basicinfo}</h1> */}
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-10">
                        <form onSubmit={handleBasicInfo} autoComplete="off">
                            <div className="row">

                                <div className="col-lg-4 mb-4">
                                    <select name="height" className="form-select form-select" aria-label=".form-select-sm example">
                                        <option selected>-- Height --</option>
                                        {
                                            heightData?.map((val, index) => {
                                                return (
                                                    <option value={val.height}>{val.height.split(".").map((value, indx) => {
                                                        return (
                                                            <h1>{value + `${indx === 0 ? "'" : '"'}`}</h1>
                                                        )
                                                    })}</option>
                                                )
                                            })
                                        }

                                    </select>
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <select name="weight" className="form-select form-select" aria-label=".form-select-sm example">
                                        <option selected>-- Weight --</option>
                                        <option value="35Kg To 45Kg">35Kg To 45Kg</option>
                                        <option value="45Kg To 55Kg">45Kg To 55Kg</option>
                                        <option value="55Kg To 65Kg">55Kg To 65Kg</option>
                                        <option value="65Kg To 75Kg">65Kg To 75Kg</option>
                                        <option value="75Kg To 85Kg">75Kg To 85Kg</option>
                                        <option value="85Kg To 95Kg">85Kg To 95Kg</option>
                                    </select>
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <select name="bloodGroup" className="form-select form-select" aria-label=".form-select-sm example">
                                        <option selected>-- Blood group --</option>
                                        <option value="A+">A+ </option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-4 mb-4">
                                    <select name="education" className="form-select form-select" aria-label=".form-select-sm example">
                                        <option selected>-- Education --</option>
                                        {
                                            educationData?.map((val, id) => {
                                                return (
                                                    <option value={val.education}>{val.education}</option>
                                                )
                                            })
                                        }

                                    </select>
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <select name="occupation" className="form-select form-select" aria-label=".form-select-sm example">
                                        <option selected>-- Occupation --</option>
                                        <option value="IT Software">IT Software</option>
                                        <option value="Business">Business</option>
                                        <option value="Lawyer">Lawyer</option>
                                        <option value="Doctor">Doctor</option>
                                        <option value="Nurse">Nurse</option>
                                        <option value="Teacher">Teacher</option>
                                        <option value="CA/Accountant">CA/Accountant</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <select name="salaryPA" className="form-select form-select" aria-label=".form-select-sm example">
                                        <option selected>-- Salary Per Annum --</option>
                                        <option value="Below 1 Lack">Below 1 Lack</option>
                                        <option value="1 to 3 Lack">1 to 3 Lack</option>
                                        <option value="3 to 6 Lack">3 to 6 Lack</option>
                                        <option value="6 to 9 Lack">6 to 9 Lack</option>
                                        <option value="Above 9 Lack">Above 9 Lack</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-4 mb-4">
                                    {/* <input type="date" name="dob" id="dob" className='form-control' /> */}
                                    <input type="text" name="dob" className="form-control" onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} placeholder={'Date of Birth'} />
                                </div>

                                <div className="col-lg-4 mb-4">
                                    {/* <input type="time" name="birth_time" id="birth_time" className='form-control' placeholder='Birth Time' /> */}
                                    <input type="text" name="birth_time" className="form-control" onFocus={(e) => (e.target.type = "time")} onBlur={(e) => (e.target.type = "text")} placeholder={'Birth Time'} />
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <input type="text" name="birth_place" id="birth_place" className='form-control' placeholder='Birth Place' />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-4 mb-4">
                                    <select name="caste" className="form-select form-select" aria-label=".form-select-sm example">
                                        <option selected>-- Caste --</option>
                                        {
                                            religionData?.map((val, id) => {
                                                return (
                                                    <option value={val.religion}>{val.religion}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <select name="subCaste" className="form-select form-select" aria-label=".form-select-sm example">
                                        <option selected>-- Sub-caste --</option>
                                    </select>
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <select name="complexion" className="form-select form-select" aria-label=".form-select-sm example">
                                        <option selected>-- Complexion --</option>
                                        <option value="Extremely fair skin">Extremely Fair Skin</option>
                                        <option value="Fair Skin">Fair Skin</option>
                                        <option value="Medium Skin">Medium Skin</option>
                                        <option value="Olive Skin">Olive Skin</option>
                                        <option value="Brown Skin">Brown Skin</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-4 mb-4">
                                    <select name="disablity" className="form-select form-select" aria-label=".form-select-sm example">
                                        <option selected>-- Disability --</option>
                                        <option value="None">None</option>
                                        <option value="Blind">Blind</option>
                                        <option value="Handicap">Handicap</option>
                                        <option value="Deaf">Deaf</option>
                                    </select>
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <select name="maritalStatus" className="form-select form-select" aria-label=".form-select-sm example">
                                        <option selected>-- Marital Status --</option>
                                        <option value="Single">Single</option>
                                        <option value="Widow">Widow</option>
                                        <option value="Widower">Widower</option>

                                    </select>
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <select name="childrens_count" className="form-select form-select" aria-label=".form-select-sm example">
                                        <option selected>-- If Widow, Childrens --</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="More than 2">More than 2</option>
                                    </select>
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-lg-12 mb-4">
                                    <input type="number" name="age" className='form-control' placeholder='Your Age' />
                                </div>

                                <div className="col-lg-12 mb-4">
                                    <input type="text" name="addressLine1" id="addressLine1" className='form-control' placeholder='Residential Address Line 1' />
                                </div>

                                <div className="col-lg-12 mb-4">
                                    <input type="text" name="addressLine2" id="addressLine2" className='form-control' placeholder='Residential Address Line 2' />
                                </div>
                            </div>

                            <div className="row">
                                <p className='mb-3'>Profile Photos :</p>
                                <div className="col-lg-12 mb-4">
                                    <input type="file" name="image1" className='form-control' required />
                                </div>

                                <div className="col-lg-12 mb-4">
                                    <input type="file" name="image2" className='form-control' required />
                                </div>

                                <div className="col-lg-12 mb-4">
                                    <input type="file" name="image3" className='form-control' required />
                                </div>
                            </div>

                            <div className="row mb-5">
                                <div className="col-lg-4 mb-4">
                                    <select name="country_name" className="form-select form-select" aria-label=".form-select-sm example" onChange={handleCountry}>
                                        <option selected>-- Country --</option>
                                        {
                                            country?.map((val, id) => {
                                                return (
                                                    <option value={val.iso2}>{val.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <select name="state_name" className="form-select form-select" aria-label=".form-select-sm example" onChange={handleState}>
                                        <option selected>-- State --</option>
                                        {
                                            stateData?.map((value, index) => {
                                                return (
                                                    <option value={value.iso2}>{value.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <select name="city_name" className="form-select form-select" aria-label=".form-select-sm example">
                                        <option selected>-- City --</option>
                                        {
                                            cityData?.map((val, index) => {
                                                return (
                                                    <option value={val.name}>{val.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <input type="text" name="taluka" id="taluka" className='form-control' placeholder='Taluka' />
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <input type="text" name="district" id="district" className='form-control' placeholder='District' />
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <input type="text" name="mother_tongue" className='form-control' placeholder='Mother Tongue' />
                                </div>

                                <div className="col-lg-12">
                                    <input type="submit" value="Save Details" id="basic_info_btn" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default BasicInfo