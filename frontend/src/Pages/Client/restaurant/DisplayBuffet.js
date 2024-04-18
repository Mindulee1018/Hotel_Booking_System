import React from 'react';
import useDisplayBuffet from '../../../hooks/Client/restaurant/useDisplayBuffet'

const DisplayBuffet = () => {
  const { buffetItems, isLoading, error } = useDisplayBuffet();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const bufferToBase64 = (buf) => {
    var binstr = Array.prototype.map
      .call(buf, function (ch) {
        return String.fromCharCode(ch);
      })
      .join("");
    return btoa(binstr);
  };

  return (
    <div> <h1 class="topic mb-5">Buffets</h1>
    <div className="row d-flex align-items-center justify-content-around mb-3">
    {buffetItems.map((item) => (
      <div key={item._id} className="col-lg-3">
        <div className="card mb-4">
          <div className="card-body">
            {item.Image && item.Image.data && (
              <img
              style={{ width: "10rem" }}
              src={`data:${
                item.Image.contentType
              };base64,${bufferToBase64(item.Image.data.data)}`}
              className="card-img-top mb-1"
              alt={item.Image}
            />
            )}
            <h2 className="card-title">{item.BuffetName}
            </h2>
            <p className="card-text fw-medium">
            {item. Description}
            </p>
            <h4>{item.Time}</h4>

            <h5>Price: Rs.{item.Price}.00</h5>
      </div>
    </div>
    </div>
  
 
  ))}
  </div>
</div>
  );
};

export default DisplayBuffet;
