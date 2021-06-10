import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'


const Header = ({showAddTask, title, onAdd}) => {
    const location = useLocation()

    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname === '/' ? <Button color={showAddTask ? 'red' : 'green'} text={showAddTask ? 'Close' : 'Add'} onClick={onAdd} /> : ''}
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker Default'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header
