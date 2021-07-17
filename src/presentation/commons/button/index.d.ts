export type IButtonProps = {
    className?: string;
    value?: string | number | undefined;
    onClick?: (...args) => void;
    dimension?: 's' | 'm' | 'l'
    color?: 'black' | 'white'
}