import github from "./db";
import { useEffect, useState, useCallback } from "react";

function App() {
  const [login, setLogin] = useState("");

  const fetchData = useCallback(() => {
    const githubQuery = {
      query: `
      {
        viewer {
          name
          login
        }
      }`,
    };

    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: JSON.stringify(githubQuery),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLogin(data.data.viewer.login);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mt-5">
      <h1 className="txt-primary">
        <i className="bi bi-diagram-2-fill"></i> Repos
      </h1>
      <p>{login}</p>
    </div>
  );
}

export default App;
