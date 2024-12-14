import { useEffect, useState } from "react";
import "./App.css";
import Confetti from "react-confetti";
import { getUserFromWorkshop } from "./api/services";
import { Axios, AxiosError } from "axios";

function App() {
  const [success, setSuccess] = useState(false);
  const [wasRequestMade, setWasRequestMade] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [workshopType, setWorkshopType] = useState(2);
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (showConfetti) {
      timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [showConfetti]);

  const handleWorkshopTypeSelection = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setWorkshopType(Number(e.target.value));
  };

  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isConvertibleToNumber(e.target.value)) {
      alert("Ο Αριθμος Μητρωου (AM) πρεπει να ειναι αριθμος");
      return;
    }
    setStudentId(e.target.value.trim());
  };

  const handleVerification = async () => {
    // setShowConfetti(true);
    if (!workshopType) {
      alert("Παρακαλω επιλεξτε Workshop");
      return;
    }

    if (!studentId) {
      alert("Παρακαλω εισαγετε τον Αριθμο Μητρωου (AM)");
      return;
    }

    try {
      const data = await getUserFromWorkshop(workshopType, studentId);
      console.log("Retrieved data: ", data);
      if (typeof data.id !== "number") throw new Error("Invalid data received");
      setSuccess(true);
      setWasRequestMade(true);
      setShowConfetti(true);
    } catch (error: unknown) {
      console.error("Error: ", error);
      if ((error as AxiosError).response?.status === 404) {
        alert("Δεν βρεθηκε ο χρηστης ❌");
        setSuccess(false);
        setWasRequestMade(true);
      } else {
        alert("Υπηρξε προβλημα κατα την αναζητηση του χρηστη");
      }
    }
  };

  function isConvertibleToNumber(value: string) {
    return !isNaN(Number(value)) && value.trim() !== ""; // Ensure it's not empty or whitespace
  }

  return (
    <>
      <div className="flex items-center justify-center space-x-4">
        <div className="w-48">
          <img
            className="w-full h-full object-contain"
            src="https://life-genera.eu/wp-content/uploads/2022/12/genera.png"
            alt="Genera's LOGO"
          />
        </div>
      </div>
      <h1>GENERA: Workshop Verification Tool</h1>
      <div className="card flex flex-col items-center justify-center space-y-4">
        <select
          name="workshop-type"
          id="workshop-type"
          className="p-2 rounded-md"
          value={workshopType}
          onChange={handleWorkshopTypeSelection}
        >
          <option value="2">Workshop 1 - Δροσσος (1ο Ετος)</option>
          <option value="3">Workshop 2 - Ξευγενης (9ο Ετος)</option>
        </select>

        <label htmlFor="student-id">Αριθμος Μητρωου (AM):</label>
        <input
          value={studentId}
          onChange={handleStudentIdChange}
          type="text"
          className="w-[500px] p-2 rounded-md"
          id="student-id"
        />

        <button onClick={handleVerification}>Επιβεβαιωση Συμμετοχης</button>
        {wasRequestMade ? (
          success ? (
            <div className="bg-green-100 p-4 rounded-md">
              <p className="text-green-700">
                Επιβεβαιωση Συμμετοχης Επιτυχης ✅
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-red-100 text-red-700 p-4 rounded-md">
                  <p className="underline">
                    Επιβεβαιωση Συμμετοχης Αποτυχε! ❌
                  </p>
                  <ul className="list-disc list-inside mt-4 flex flex-col items-start space-y-2">
                    <li>Ειτε δεν εχετε φτιαξει Account στο Genera Game.</li>
                    <li>
                      Ειτε το Player Name σας δεν εχει την σωστη μορφη:{" "}
                      <span>
                        <strong>{"uniwa ws2 <AM>"}</strong>
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-100 text-red-700 p-4 rounded-md w-full">
                  <p className="underline">Και τι μπορω να κανω τωρα?</p>
                  <ol className="list-decimal list-inside mt-4 flex flex-col items-start space-y-2">
                    <li>
                      Πηγαινε στον <strong>Discord Server</strong>
                    </li>
                    <li>
                      Στην κατηγορια <strong>announcement</strong>
                    </li>
                    <li>
                      Ακολουθησε τις αντιστοιχες <strong>οδηγιες</strong>
                    </li>
                  </ol>
                </div>
              </div>
            </>
          )
        ) : null}
      </div>
      {showConfetti && <Confetti run={showConfetti} tweenDuration={2500} />}
    </>
  );
}

export default App;
