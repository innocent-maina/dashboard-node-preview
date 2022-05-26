import React from 'react';
import axios from 'axios';

export default class projectList extends React.Component {
  state = {
    projects: []
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/api/v1/projects/preview`)
      .then(res => {
        const projects = res.data;
        this.setState({ projects });
        console.log(projects)
      })
  }

  render() {
    return (
      <p>Innocent</p>
      // <ul>
      //   {
      //     this.state.projects
      //       .map(project =>
      //         <li key={project._id}>{project.name}</li>
      //       )
      //   }
      // </ul>
    )
  }
}