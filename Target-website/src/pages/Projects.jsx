import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

const projects = [
  {
    id: 1,
    title: "Clarkson Aerial",
    image: "https://orascom.com/wp-content/uploads/Clarkson-Aerial-Jan2023-5-1366x768.png",
    description: "A beautiful aerial view of Clarkson University",
  },
  {
    id: 2,
    title: "Plant 1 Bahr",
    image: "https://orascom.com/wp-content/uploads/Plant-1-Bahr-2.png",
    description: "A photo of Plant 1 Bahr",
  },
  {
    id: 3,
    title: "DJI_0104",
    image: "https://orascom.com/wp-content/uploads/DJI_0104-0-e1687423876762-1366x768.jpg",
    description: "A beautiful photo taken by a drone",
  },
];

const Projects = () => {
  return (
    <div className="container" style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {projects.map((project) => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <Card
            title={project.title}
            image={project.image}
            description={project.description}
          />
        </Link>
      ))}
    </div>
  );
};

export default Projects;

