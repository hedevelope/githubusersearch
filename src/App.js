import React, { useState, useEffect } from "react";
import { Form, Card, Icon, Image } from "semantic-ui-react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";

function App() {
  const [searchInputValue, setSearchInputValue] = useState();
  const [userName, setuserName] = useState("");

  const [data, setData] = useState({
    name: "John Doe",
    login: "johndoe",
    followers: "112",
    following: "41",
    location: "Kayseri",
    public_repos: "58",
    avatar_url: "https://avatars.githubusercontent.com/u/2905187?v=4",
    bio: "Live in the moment!",
    company: "E.A.H Games",
  });
  function var1() {
    document.getElementById("id01").innerHTML = `<div><Card>
    <Image style="width: 100%;" src='https://i.imgur.com/RCIP7Zs.png'/>
    <Card.Content>
      <Card.Header><h4>Search For Another User &nbsp  \\(•◡•)/</h4></Card.Header>
    </Card.Content>
    </Card></div>`;
    setTimeout(3000);
  }

  useEffect(
    (data) => {
      if (userName) {
        fetch(`https://api.github.com/users/${userName}`, {
          headers: {
            Authorization: "token yourtokenhere",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message === "Not Found") {
            var1();
            } else {
              setData(data);
        console.log(data);
            }
          });

        console.log(data);
      }
    },
    [userName]
  );

  const handleSearch = (e) => {
    setSearchInputValue(e.target.value);
  };

  const handleSubmit = () => {
    setuserName(searchInputValue);
  };

  return (
    <>
      <div className="maindiv">
        <div className="search">
          <Form className="input">
            <Form.Group>
              <Form.Input
                icon={<Icon name="search" />}
                placeholder="Username..."
                onChange={handleSearch}
              />
              <button className="ui button" onClick={handleSubmit}>
                Search
              </button>
            </Form.Group>
          </Form>
        </div>
      </div>
      <div className="nav">
        <Icon name="github" />
        Github User Search
      </div>
      <div className="card">
        <Card id="id01">
          <Image src={data.avatar_url} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{data.name}</Card.Header>
            <br />
            <Card.Header>{data.login}</Card.Header>
            <br />
            <Card.Meta>
              <Icon name="map marker" />
              <span>{data.location}</span>
            </Card.Meta>
            <Card.Meta>
              <Icon name="building" />
              <span>{data.company}</span>
            </Card.Meta>
            <Card.Description>{data.bio}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <span>
              <Icon name="user" />
              {data.followers} Followers
            </span>
          </Card.Content>
          <Card.Content extra>
            <span>
              <Icon name="user" />
              {data.following} Followings
            </span>
          </Card.Content>
          <Card.Content extra>
            <span>
              <Icon name="box" />
              {data.public_repos} Repos
            </span>
          </Card.Content>
        </Card>
      </div>
    </>
  );
}

export default App;
