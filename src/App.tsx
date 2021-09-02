import { useState, useEffect, ChangeEvent } from 'react';

export default function App() {
  const [result, setResult] = useState<string[]>([]);
  const [filterItem, setFilterItem] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://api.publicapis.org/categories')
    .then(response => response.json())
    .then(data => {
      setResult(data);
      setFilterItem(data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const entered = event.target.value.toLowerCase();
    setFilterItem(result.filter(
      el => el.toLowerCase().indexOf(entered) !== -1
    ));
  }

  return (
    <div>
      <input id="category" type="text" onChange={onChange} />
      <ul>
      {filterItem.map((item, index) => (<li key={index}>{item}</li>))}
      </ul>
    </div>
  )
}
