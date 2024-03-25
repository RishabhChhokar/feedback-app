import { useState } from "react";
const Feedback = () => {
  const [star1, setStar1] = useState(0);
  const [star2, setStar2] = useState(0);
  const [star3, setStar3] = useState(0);
  const [star4, setStar4] = useState(0);
  const [star5, setStar5] = useState(0);

  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState("1");

  const [userList, setUserList] = useState([]);

  const [isEdit, setIsEditButton] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleDelete = (index, r) => {
    setUserList((prevList) => prevList.filter((_, i) => i !== index));
    if (r === "1") setStar1((s) => s - 1);
    if (r === "2") setStar2((s) => s - 1);
    if (r === "3") setStar3((s) => s - 1);
    if (r === "4") setStar4((s) => s - 1);
    if (r === "5") setStar5((s) => s - 1);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setIsEditButton((t) => !t);

    setUserName(userList[index].name);
    setRating(userList[index].rating);
  };

  const generateList = () => {
    if (rating === "1") setStar1((s) => s + 1);
    if (rating === "2") setStar2((s) => s + 1);
    if (rating === "3") setStar3((s) => s + 1);
    if (rating === "4") setStar4((s) => s + 1);
    if (rating === "5") setStar5((s) => s + 1);
    setUserList((u) => [...u, { name: userName, rating: rating }]);
  };

  const generateEditedList = (index) => {
    const updatedUserList = [...userList];
    updatedUserList[index] = { name: userName, rating: rating };
    setUserList(updatedUserList);
    setIsEditButton(false)
  };

  return (
    <>
      <h2>FeedBack System</h2>
      <h3 className="rating">Overall Ratings</h3>
      <p className="ratingStars">*{star1}</p>
      <p className="ratingStars">**{star2}</p>
      <p className="ratingStars">***{star3}</p>
      <p className="ratingStars">****{star4}</p>
      <p className="ratingStars">*****{star5}</p>

      <br />
      <br />
      <label htmlFor="userName">Enter Your Name:</label>
      <input
        value={userName}
        id="userName"
        type="text"
        onChange={handleUserName}
      />
      <label htmlFor="ratingSelection">Choose Rating:</label>
      <select value={rating} id="ratingSelection" onChange={handleRatingChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      {!isEdit ? (
        <button onClick={generateList}>Submit</button>
      ) : (
        <button onClick={() => generateEditedList(editIndex)}>
          EDIT RATING
        </button>
      )}
      <br />
      <br />

      <h3 style={{ margin: 0 }}>ALL FEEDBACKS</h3>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {userList.map((user, index) => {
          return (
            <li key={index}>
              {user.name} {user.rating}
              <button onClick={() => handleDelete(index, user.rating)}>
                Delete
              </button>
              <button onClick={() => handleEdit(index)}>Edit</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default Feedback;
