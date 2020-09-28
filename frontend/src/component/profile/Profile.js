import React,{useState} from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import RenderProfile from'../profile-render/RenderProfile'
const Profile = () => {
    const [open,setOpen]=useState(false)
    const onOpenModal=(e)=>{
        setOpen(true)

    }
    const onCloseModal=(e)=>{
        setOpen(false)
    }
    return (
        <div>
        <button className="btn btn-primary" onClick={e=>onOpenModal(e)}>Profile</button>
        <Modal open={open} onClose={e=>onCloseModal(e)} center>
           <RenderProfile />
        </Modal>
        </div>
    );
};

export default Profile;