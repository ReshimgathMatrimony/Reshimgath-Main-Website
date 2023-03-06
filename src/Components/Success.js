import React, { useEffect, useState } from 'react';
import "../Components/Success.css"
import successStoryImge from "../images/success_story_img1.jpg"
import axios from 'axios'
const Success = () => {
    const [storydata, setStorydata] = useState([])
    useEffect(() => {
        axios.get('https://reshimgathadminpanel.netlify.app/admincrud/getstories').then((res) => {
            setStorydata(res.data)
        }).catch((err) => {

        })
    }, [])

    const handleDate = (date) => {
        const mydate = new Date(date)
        const newdate = mydate.toLocaleDateString()
        if (newdate === '1/1/1970') {
            return '---'
        } else {
            return newdate
        }
    }

    return (
        <div className='mainContainer'>
            <div className="container-fluid successs_main_container">
                <div className="row">
                    <h1 className="success_title">Some Of Our Success Stories</h1>
                </div>

                <div className="container success_cards_container">
                    <div className="row">
                        {
                            storydata?.map((val, id) => {
                                return (
                                    <div className="col-lg-4 col-sm-6 col-xs-6 card">
                                        <div className="success_card_div">
                                            <img src={val.image} alt="image" />

                                            <p className='text-capitalize'>{val.men} & {val.women} <br /> {handleDate(val.date)}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row mb-5">
                    <h3 className='getStartedText'>Your story is waiting to happen !</h3>
                    <center>
                        <a href="#" className='getstartedBtn'>Get Started</a>
                    </center>
                </div>
            </div>

        </div>
    )
}

export default Success