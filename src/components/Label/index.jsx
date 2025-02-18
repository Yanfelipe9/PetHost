import style from './label.module.css'

export const Label = ({ children, ...rest }) => {
    return <label {...rest} className={style.Label}>
        {children}
    </label>
}