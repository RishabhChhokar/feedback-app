import { useState, useRef } from "react";
const Feedback = () => {
  const star1Ref = useRef(0);
  const star2Ref = useRef(0);
  const star3Ref = useRef(0);
  const star4Ref = useRef(0);
  const star5Ref = useRef(0);

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

  const ratingDecrementer = (r) => {
    if (r === "1") star1Ref.current -= 1;
    if (r === "2") star2Ref.current -= 1;
    if (r === "3") star3Ref.current -= 1;
    if (r === "4") star4Ref.current -= 1;
    if (r === "5") star5Ref.current -= 1;
  };

  const ratingIncrementer = (r) => {
    if (r === "1") star1Ref.current += 1;
    if (r === "2") star2Ref.current += 1;
    if (r === "3") star3Ref.current += 1;
    if (r === "4") star4Ref.current += 1;
    if (r === "5") star5Ref.current += 1;
  };
  const handleDelete = (index, r) => {
    setUserList((prevList) => prevList.filter((_, i) => i !== index));
    ratingDecrementer(r);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setIsEditButton((t) => !t);

    setUserName(userList[index].name);
    setRating(userList[index].rating);
  };

  const generateList = () => {
    if (
      userName.trim().length === 0 ||
      (userList.findIndex((user) => user.name === userName) !== -1)
    )
      return;
    ratingIncrementer(rating);
    setUserList((u) => [...u, { name: userName, rating: rating }]);
    setUserName('');
    setRating('1')
  };

  const generateEditedList = (index) => {
    const updatedUserList = [...userList];
    ratingDecrementer(updatedUserList[index].rating);
    ratingIncrementer(rating);
    updatedUserList[index] = { name: userName, rating: rating };

    setUserList(updatedUserList);
    setIsEditButton(false);
    setUserName("");
    setRating("1");
  };

  return (
    <>
      <h2>FeedBack System</h2>
      <h3 className="rating">Overall Ratings</h3>
      <p className="ratingStars">*{star1Ref.current}</p>
      <p className="ratingStars">**{star2Ref.current}</p>
      <p className="ratingStars">***{star3Ref.current}</p>
      <p className="ratingStars">****{star4Ref.current}</p>
      <p className="ratingStars">*****{star5Ref.current}</p>

      <br />
      <br />
      <h3 style={{ margin: 0 }}>FeedBack Form</h3>
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
              <> </>
              <button onClick={() => handleDelete(index, user.rating)}>
                Delete
              </button>
              <> </>
              <button onClick={() => handleEdit(index)}>Edit</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default Feedback;
