export default function Home() {
  // En el futuro aquí vas a conectar con tu backend y mostrar tareas
  const tasks = [
    { id: 1, title: "Estudiar Django", status: false },
    { id: 2, title: "Hacer frontend con React", status: true },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Mis Tareas</h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="p-3 border rounded flex justify-between items-center"
          >
            <span>{task.title}</span>
            <span
              className={`px-2 py-1 rounded ${
                task.status ? "bg-green-500 text-white" : "bg-gray-300"
              }`}
            >
              {task.status ? "Completada" : "Pendiente"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
