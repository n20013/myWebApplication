import React from 'react'
import './App.css'

class MoneyBook extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      books: []
    }
    this.URI = 'http://localhost:8080/budget.json'
  }

  componentDidMount () {
    window
      .fetch(this.URI)
      .then(res => res.json())
      .then(books => this.setState({ books }))
  }

  render () {
    const books = this.state.books
    if (!books.length) return <div>Now Loading...</div>
    return (
      <>
        <h1>MoneyBook</h1>
        <TableView books={books} />
        <EntryView />
      </>
    )
  }
}

const TableView = props => {
  const { books } = props
  const headings = ['date', 'item', 'income', 'expenses']
  return (
    <table className='book'>
      <MatrixHeader headings={headings} />
      <MatrixBody books={books} />
    </table>
  )
}

const MatrixHeader = props => (
  <thead data-type='ok'>
    <tr>
      {props.headings.map(heading => (
        <th key={heading}>{heading}</th>
      ))}
    </tr>
  </thead>
)

const MatrixBody = props => (
  <tbody>
    {props.books.map(book => (
      <BookItem book={book} key={book.date + book.item} />
    ))}
  </tbody>
)

const BookItem = props => {
  const { date, item, amount } = props.book
  const isNegative = amount => amount < 0
  return (
    <tr>
      <td>{date}</td>
      <td>{item}</td>
      <td>{isNegative(amount) ? null : amount}</td>
      <td>{isNegative(amount) ? Math.abs(amount) : null}</td>
    </tr>
  )
}

class EntryView extends React.Component {
  render () {
    return (
      <div className='entry'>
        <fieldset>
          <legend>記帳</legend>
          <fieldset>
            <legend>入出金</legend>
            <label>
              <input type='radio' value='on' name='cash' />
              入金
            </label>
            <label>
              <input type='radio' value='off' name='cash' />
              出金
            </label>
          </fieldset>
          <label className='box'>
            日付
            <input type='text' />
          </label>
          <label className='box'>
            項目
            <input type='text' />
          </label>
          <label className='box'>
            金額
            <input type='text' />
          </label>
          <button>追加</button>
        </fieldset>
      </div>
    )
  }
}
export default MoneyBook
