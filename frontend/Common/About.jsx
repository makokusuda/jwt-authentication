import React, { useEffect } from "react";

const About = (props) => {
  const { setMode } = props;

  useEffect(() => {
    setMode("about");
  }, []);

  return <div>About</div>;
};

export default About;
