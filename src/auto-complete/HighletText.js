const HighletText = ({
    text, highlet
}) => {
    const index = text.toLowerCase().indexOf(highlet.toLowerCase());
    return (
        <div className="highlt">
            {text.substring(0,index)} <span>{text.substring(index,index + highlet.length)}</span>{text.substring(index + highlet.length)}
        </div>
    )
}

export default HighletText;