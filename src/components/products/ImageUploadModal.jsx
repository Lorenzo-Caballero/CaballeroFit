import React, { useState, useEffect } from "react";
import axios from "axios";

const TrainingPlanModal = ({ isOpen, onClose }) => {
  const [values, setValues] = useState({
    name: "",
    exercises: [],
  });
  const [totalDuration, setTotalDuration] = useState(0);

  // Opciones predefinidas para ejercicios
  const exercisesOptions = [
    { name: "Flexiones", durationPerSet: 1, sets: 3, repetitions: 10 },
    { name: "Sentadillas", durationPerSet: 0.5, sets: 4, repetitions: 15 },
    { name: "Plancha", durationPerSet: 0.75, sets: 3, repetitions: 30 },
  ];

  // Calcular la duración total del plan de entrenamiento
  useEffect(() => {
    const duration = values.exercises.reduce(
      (acc, exercise) => acc + exercise.durationPerSet * exercise.sets,
      0
    );
    setTotalDuration(duration);
  }, [values.exercises]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleExerciseChange = (index, e) => {
    const { name, value } = e.target;
    setValues((prevValues) => {
      const exercises = [...prevValues.exercises];
      exercises[index][name] = value;
      return { ...prevValues, exercises };
    });
  };

  const handleAddExercise = () => {
    setValues((prevValues) => ({
      ...prevValues,
      exercises: [...prevValues.exercises, { ...exercisesOptions[0] }],
    }));
  };

  const handleRemoveExercise = (index) => {
    setValues((prevValues) => {
      const exercises = [...prevValues.exercises];
      exercises.splice(index, 1);
      return { ...prevValues, exercises };
    });
  };

  const handleCreatePlan = async () => {
    try {
      if (!values.name || values.exercises.length === 0) {
        console.error("Por favor complete todos los campos.");
        return;
      }

      const response = await axios.post(
        "https://api.example.com/training-plans",
        JSON.stringify(values),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Plan de entrenamiento creado exitosamente");
        onClose();
      } else {
        console.error(
          "Error al crear el plan de entrenamiento:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error al crear el plan de entrenamiento:", error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 className="text-xl font-bold mb-4">Crear Plan de Entrenamiento</h2>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre del Plan"
            value={values.name}
            onChange={handleInputChange}
            className="px-4 py-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Ejercicios:</h3>
          {values.exercises.map((exercise, index) => (
            <div key={index} className="mb-2">
              <label className="block font-semibold mb-1">{`Ejercicio ${index + 1}:`}</label>
              <select
                name="name"
                value={exercise.name}
                onChange={(e) => handleExerciseChange(index, e)}
                className="px-4 py-2 border border-gray-300 rounded w-full"
              >
                {exercisesOptions.map((option, optionIndex) => (
                  <option key={optionIndex} value={option.name}>{option.name}</option>
                ))}
              </select>
              <div className="flex items-center mt-2">
                <label className="block w-1/3">Sets:</label>
                <input
                  type="number"
                  name="sets"
                  value={exercise.sets}
                  onChange={(e) => handleExerciseChange(index, e)}
                  className="px-2 py-1 border border-gray-300 rounded w-1/3 mr-2"
                />
                <label className="block w-1/3">Repetitions:</label>
                <input
                  type="number"
                  name="repetitions"
                  value={exercise.repetitions}
                  onChange={(e) => handleExerciseChange(index, e)}
                  className="px-2 py-1 border border-gray-300 rounded w-1/3"
                />
              </div>
              {index > 0 && (
                <button
                  onClick={() => handleRemoveExercise(index)}
                  className="text-sm text-red-500 mt-2"
                >
                  Eliminar Ejercicio
                </button>
              )}
            </div>
          ))}
          <button
            onClick={handleAddExercise}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Agregar Ejercicio
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Duración Total del Plan:</h3>
          <p>{`${totalDuration} minutos`}</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleCreatePlan}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
          >
            Crear Plan
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingPlanModal;
