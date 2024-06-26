import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/home.css';
const URL = 'https://6661248863e6a0189fe89795.mockapi.io/api/v1/courses'

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [detailPopup, setDetailPopup]=useState(null);
    // const [open, setOpen] = useState(false);
    const getListCourses = async () => {
        const res=await axios.get(URL);
        try {
            if(res.status===200){
                setCourses(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getListCourses();
    }, []);
    
    const handleViewPopup = (course) =>{
        setDetailPopup(course);
    }
    const handleClosePopup = () =>{
        setDetailPopup(null);
    }
  return (
    <div className='container'>
        {courses&&courses.map((course) => (
            <div className='card' key={course.id}>
                <img src={course.image} alt={course.id}/>
                <h3>{course.title}</h3>
                <button onClick={()=> handleViewPopup(course)}>View Details</button>
                {/* <Button type="primary" onClick={showModal}>View Details</Button> */}
            </div>
        ))}
        {detailPopup&&(
            <div className='popup'>
                <div className="popup-content">
                <div>
                    <span className='close' onClick={handleClosePopup}>
                        &times;
                    </span>
                    
                    <img src={detailPopup.image} alt={detailPopup.id}/>
                    <div className='popup-text'>
                    <h2>ID: {detailPopup.id}</h2>
                    <p>Title: {detailPopup.title}</p>
                    <p>Desc: {detailPopup.desc}</p>
                    <p>Number of weeks: {detailPopup.number_of_weeks}</p>
                    <p>Start Date: {new Date(detailPopup.start_date * 1000).toLocaleDateString}</p>
                    </div>
                </div>
            </div>
            </div>
        )}
    </div>
  )
}

export default Home