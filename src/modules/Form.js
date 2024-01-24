import { I } from '../modules/Unit';
import { useEffect } from 'react';
import '../style/Form.css';
import Tool from 'befunc';

/**
    调用示例
    const [ formV, setFormV ] = useState({});
    const [ formE, setFormE ] = useState({});
    const formData = [
        { type: 'text', name: 'username', title: '用户名', icon: '', hint: '测试一下', must: true },
        { type: 'password', name: 'password', title: '密码', icon: '', hint: '测试一下', must: false },
        { type: 'email', name: 'email', title: '邮箱', icon: '', hint: '测试一下', must: false },
        { type: 'number', name: 'number', title: '数字', icon: '', hint: '测试一下', must: false }
    ];
    const sendForm = () => {
        const data = check( formData, formV );
        if ( data.error ) {
            setFormE({ ...formE, [data.error]: true });
            setTimeout(() =>{ setFormE({ ...formE, [data.error]: false }); }, 600 );
            return toast( t( data.toast ), '', true );
        }
        console.log( formV );
    }
    <Form error={formE} setError={setFormE} value={formV} setValue={setFormV} onSubmit={sendForm}>{formData}</Form>
 */

const Title = ({ children }) => {
    return <p className='inputTitle'><I s='i-record'></I>{children}</p>
}
const Input = ( props ) => {
    const v = props.children; // 组件配置
    const defaultIcon = {
        'text': 'i-pen',
        'password': 'i-shield-lock',
        'email': 'i-envelope-open',
        'number': 'i-grid-3x3-gap'
    };
    switch ( v.type ) {
        case 'text':
        case 'password':
        case 'email':
        case 'number':
            return (
                <>
                    {v.title ? <Title>{v.title}</Title> : ''}
                    <I className={`iconLeft ${props.error ? 'error' : ''}`} s={v.icon ? v.icon : defaultIcon[v.type] } size='var( --height )'></I>
                    <input
                        value={props.value}
                        onChange={(e) => { props.setValue( e.target.value ); }}
                        onKeyDown={(e) => { props.onKeyDown(e); }}
                        type={v.type}
                        name={v.name}
                        placeholder={v.hint}
                        autoComplete="off"
                    />
                </>
            );

        default: return;
    }
}
export const check = ( data, value ) => {
    const result = {};
    for ( const d of data ) {
        let v = value[d.name];
        // 必填检查
        if ( d.must && Tool.empty( v ) ) { return { error: d.name, toast: 'form.isMust' }; }
        // 邮箱检查
        if ( d.type === 'email' && !Tool.empty( v ) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( v ) ) {
            return { error: d.name, toast: 'form.isEmail' };
        }
        // 数字检查
        if ( d.type === 'number' && !Tool.empty( v ) && !/^[0-9]+$/.test( v ) ) {
            return { error: d.name, toast: 'form.isEmail' };
        }
        // 检查通过
        result[d.name] = v;
    }
    return result;
};
export default function Form( props ) {
    // 表单值
    const value = props.value;
    const error = props.error;
    // 更新表单值
    const setValue = ( name, newValue, type = 'text' ) => {
        if ( type === 'boolean' ) { newValue = newValue ? true : false; }
        props.setValue({
            ...value,
            [name]: newValue
        });
    };
    // 更新要求
    const boolean = [ 'switch' ];
    const require = ( type ) => {
        if ( boolean.includes( type ) ) { return 'boolean'; }
        return 'text';
    }
    // 表单值初始化
    useEffect(() => {
        const initialize = {};
        const initializeError = {};
        for ( const v of props.children ) {
            let defaultValue = '';
            initialize[v.name] = v.value ? v.value : defaultValue;
            initializeError[v.name] = false;
        }
        props.setValue( initialize );
        props.setError( initializeError );
    // eslint-disable-next-line
    }, [] );
    // 鼠标按下事件
    const onKeyDown = ( e ) => {
        if ( e.key === 'Enter' ) {
            props.onSubmit();
        }
    }
    // 渲染表单
    return (
        <form onSubmit={(e) => { e.preventDefault(); props.onSubmit(); }}>
            {props.children.map(( v, i ) => (
                <div className="unitInput" key={i} style={props.style}>
                    <Input
                        error={error[v.name]}
                        value={value[v.name] ? value[v.name] : ''}
                        setValue={( d ) => { setValue( v.name, d, require( v.type ) ); }}
                        onKeyDown={onKeyDown}
                    >{v}</Input>
                </div>
            ))}
        </form>
    );
}