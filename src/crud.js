import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import './index.css';
import { doc, addDoc, collection, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';

const Crud = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [fetchData, setFetchData] = useState([]);
  const [id, setId] = useState();

  // Creating Database Ref
  const dbref = collection(db, 'coba');
  // Starting data to database
  const add = async () => {
    const adddata = await addDoc(dbref, { Name: name, Email: email, Phone: phone });
    if (adddata) {
      alert('Data Added Successfuly');
      window.location.reload();
    } else {
      alert('Error  Occured To add the data');
    }
  };
  // fetching the data from database
  const fetch = async () => {
    const snapshot = await getDocs(dbref);
    const fetchdata = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setFetchData(fetchdata);
  };

  useEffect(() => {
    fetch();
  }, []);

  // Pass Update data to form
  const passData = async (id) => {
    const matchId = fetchData.find((data) => {
      return data.id === id;
    });
    setName(matchId.Name);
    setEmail(matchId.Email);
    setPhone(matchId.Phone);
    setId(matchId.id);
  };

  // Update the data
  const update = async () => {
    const updateref = doc(dbref, id);
    try {
      const updatedata = await updateDoc(updateref, { Name: name, Email: email, Phone: phone });
      alert('Update Successfuly');
      window.location.reload();
    } catch (error) {
      alert(error, 'Update Error Occured');
    }
  };

  // Delete data from database
  const del = async (id) => {
    const delref = doc(dbref, id);
    try {
      await deleteDoc(delref);
      alert('Deleted Successfuly');
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="px-6 md:px-10 lg:px-16 py-16 md:py-24 lg:py-28 ">
        <div className="flex justify-between items-center bg-teal-700 fixed right-0 left-0 top-0 px-6 md:px-10 lg:px-16 py-6">
          <div>
            <p className=" text-white text-sm md:text-base">5220411432</p>
            <p className="font-semibold text-white text-sm md:text-base">Muhammad Ilham Setiwan</p>
          </div>
          <p className="text-base md:text-2xl font-bold text-white">Design Front-End</p>
          <p className="hidden md:block font-semibold text-white text-sm md:text-base">Universitas Teknologi Yogyakarta</p>
        </div>
        {/* Form Add / Update */}
        <div className="w-2/3 md:w-1/2 mx-auto mt-16 md:mt-14 lg:mt-10 p-5 shadow-full shadow-teal-600 rounded-md">
          <h2 className="text-2xl text-teal-600 font-bold">Add / Update Form</h2>
          <div className="box mt-5">
            <input
              type="text"
              placeholder="Full Name"
              autoComplete="Off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="outline-none w-full rounded-md py-2 bg-teal-50 border-b-2 border-teal-600"
            ></input>
          </div>
          <div className="box">
            <input
              type="email"
              placeholder="E-mail"
              autoComplete="Off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none w-full rounded-md py-2 bg-teal-50 border-b-2 border-teal-600"
            ></input>
          </div>
          <div className="box">
            <input
              type="text"
              placeholder="Phone Number"
              autoComplete="Off"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="outline-none w-full rounded-md py-2 bg-teal-50 border-b-2 border-teal-600"
            ></input>
          </div>
          <div className="flex justify-around mt-5">
            <button onClick={add} className="py-2 px-4 bg-teal-600 hover:bg-teal-700 rounded-md text-white">
              Add
            </button>
            <button onClick={update} className="py-2 px-4 bg-teal-600 hover:bg-teal-700 rounded-md text-white">
              Update
            </button>
          </div>
        </div>
        {/* Database */}
        <div className="database mt-14">
          <h2 className="text-2xl font-bold text-teal-600 text-center pb-4 py-4 border-t-2 border-teal-600 ">Saved Data</h2>
          <div className="container mt-5 flex flex-wrap justify-center md:justify-start gap-10">
            {fetchData.map((data) => {
              return (
                <>
                  <div className="box shadow-full shadow-teal-600 rounded-md p-5">
                    <h3 className="py-1 border-b-2 border-teal-600 rounded-md text-teal-800">Name: {data.Name}</h3>
                    <h3 className="py-1 border-b-2 border-teal-600 rounded-md text-teal-800">E-mail: {data.Email}</h3>
                    <h3 className="py-1 border-b-2 border-teal-600 rounded-md text-teal-800">Phone: {data.Phone}</h3>
                    <div className='flex justify-around mt-4'>
                    <button onClick={() => passData(data.id)} className="py-2 px-4 bg-teal-600 hover:bg-teal-700 rounded-md text-white">Update</button>
                    <button onClick={() => del(data.id)} className="py-2 px-4 bg-teal-600 hover:bg-teal-700 rounded-md text-white">Delete</button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Crud;
