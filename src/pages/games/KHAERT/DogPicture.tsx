import React, { useEffect, useState } from "react";

const DogPicture = () => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => res.json())
      .then((data) => {
        setImageUrl(data.message);
      });
  }, []);

  return (
    <div className="mw-240">
      <img src={imageUrl} alt="a dog" className="w-100" />
    </div>
  );
};

export default DogPicture;
