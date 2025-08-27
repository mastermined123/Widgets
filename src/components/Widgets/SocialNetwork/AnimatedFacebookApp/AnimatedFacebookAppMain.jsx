import React, { useState } from "react";
import AnimatedFacebookAppForm from "./AnimatedFacebookAppForm";

function AnimatedFacebookAppMain({ card }) {
    // State management for all form fields
    const [appName, setAppName] = useState("");
    const [tags, setTags] = useState([]);
    const [facebookPageUrl, setFacebookPageUrl] = useState("");
    const [numberOfPosts, setNumberOfPosts] = useState("5");
    const [postDuration, setPostDuration] = useState("15");
    const [textSize, setTextSize] = useState("16");
    const [textFont, setTextFont] = useState("");
    const [kenBurnsEffect, setKenBurnsEffect] = useState(true);
    const [transitionAnimation, setTransitionAnimation] = useState(true);
    const [headerColor, setHeaderColor] = useState("#1877f2");
    const [highlightColor, setHighlightColor] = useState("#1877f2");
    const [textColor, setTextColor] = useState("#333");
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
    const [backgroundImage, setBackgroundImage] = useState("");

    return (
        <AnimatedFacebookAppForm
            card={card}
            appName={appName}
            setAppName={setAppName}
            tags={tags}
            setTags={setTags}
            facebookPageUrl={facebookPageUrl}
            setFacebookPageUrl={setFacebookPageUrl}
            numberOfPosts={numberOfPosts}
            setNumberOfPosts={setNumberOfPosts}
            postDuration={postDuration}
            setPostDuration={setPostDuration}
            textSize={textSize}
            setTextSize={setTextSize}
            textFont={textFont}
            setTextFont={setTextFont}
            kenBurnsEffect={kenBurnsEffect}
            setKenBurnsEffect={setKenBurnsEffect}
            transitionAnimation={transitionAnimation}
            setTransitionAnimation={setTransitionAnimation}
            headerColor={headerColor}
            setHeaderColor={setHeaderColor}
            highlightColor={highlightColor}
            setHighlightColor={setHighlightColor}
            textColor={textColor}
            setTextColor={setTextColor}
            backgroundColor={backgroundColor}
            setBackgroundColor={setBackgroundColor}
            backgroundImage={backgroundImage}
            setBackgroundImage={setBackgroundImage}
        />
    );
}

export default AnimatedFacebookAppMain;
