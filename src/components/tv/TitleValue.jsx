

function TitleValue({ title, value }) {

  return (
    <div>
      <div className="text-zinc-500 font-medium">{title}</div>
      <div className="text-white">{value}</div>
    </div>
  )

}

export default TitleValue;