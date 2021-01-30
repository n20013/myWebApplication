import React from 'react'
import './App.css'

class MoneyBook extends React.component {
  constructor (props) {
    super(props)
    this.state = { books: [] }
    this.URI = 'http://localhost:8080/budget' // what is this
  }

  componentDidMount () {
    this.setState({
      books: [
        { date: '1/1', item: 'お年玉', amount: 10000 },
        { date: '1/3', item: 'ケーキ', amount: -500 },
        { date: '2/1', item: '小遣い', amount: 3000 },
        { date: '2/5', item: 'マンガ', amount: -600 }
      ]
    })
  }
  
  render () {
    return (
      <div>
        <title>小遣い帳</title>
        <MoneyBookList books={this.state.books} />
        <MoneyEntry
          add={(date, item, amount) => this.addBook(date, item, amount)}
        />
      </div>
    )
  }

  addBook (date, item, amount) {
    const book = { date: date, item: item, amount: amount }
    this.setState({ books: [...this.state.books, book] })
  }

class MoneyEntry extends Component {
  constructor (props) {
    super(props)
    this.state = { date: '', item: '', amount: '', payingIn: true }
  }

  onChangeDate (event) {
    this.setState({ date: event.target.value })
  }

  onChangeItem (event) {
    this.setState({ item: event.target.value })
  }

  onChangeAmount (event) {
    this.setState({ amount: event.target.value })
  }

  onChangePayingIn (event) {
    this.setState({ payingIn: event.target.value })
  }

  onClickSubmit () {
    this.props.add(
      this.state.date,
      this.state.item,
      this.state.amount * (this.state.payingIn ? 1 : -1)
    )
    this.setState({ date: '', item: '', amount: '', payingIn: false })
  }
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

/*
MoneyEntry.propTypes = {
  add: PropTypes.func.isRequired
}

const MoneyBookList = props => {
  return (
    <div>
      <table className='book'>
        <thead data-type='ok'>
          <tr>
            <th>日付</th>
            <th>項目</th>
            <th>入金</th>
            <th>出金</th>
          </tr>
        </thead>
        <tbody>
          {props.books.map(book => (
            <MoneyBookItem book={book} key={book.date + book.item} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

MoneyBookList.propTypes = {
  books: PropTypes.array.isRequired
}
*/
export default MoneyBook
