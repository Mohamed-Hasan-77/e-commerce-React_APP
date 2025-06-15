import React from "react";

export default function HomeBanner() {
  return <>
        <div className="card lg:card-side ">
            <figure className=" w-full md:w-1/2">
                <img
                src="https://i.ibb.co/vxdHfLxG/1.png"
                alt="Album" />
            </figure>
            <div className="card-body flex justify-center">
                <h2 className="card-title text-3xl">New Cars Here Waiting For you !</h2>
                <p className="flex-grow-0">Click the button to See them Now </p>
                <div className="card-actions ">
                    <button className="btn btn-primary"> Explore </button>
                </div>
            </div>
        </div>
  </>
}
