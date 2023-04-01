import React, {useState} from 'react';

interface selectOptionsInterface {
    currentValue: string,
    variants: Array<string>,
    setCurrentValue: (item: string) => any,
}

const SelectOptionsList = ({currentValue, setCurrentValue, variants}: selectOptionsInterface) => {

    const [isOpen, setIsOpen] = useState(false)

    const translateIcon=()=>{
        if(isOpen){
            return '  -rotate-90  '
        }
        else{
            return ' rotate-0 '
        }
    }

    const toggleAnimation=()=>{
        if(isOpen){
            return ' animate-fade-in-down '
        }
        else{
            return ' animate-fade-in-up '
        }
    }

    return (
        <div className={'min-w-32 p-2 h-8 rounded-full flex items-center bg-white justify-center border-violet border-2'}>
            <div className={'w-full relative text-white font-semibold text-center'} onClick={()=>{setIsOpen(!isOpen)}}>
                <div className={'flex cursor-pointer justify-between items-center px-3'}>
                    <p className={'text-violet text-sm leading-[100%]'}>{currentValue}</p>
                    <div className={'transition-all text-violet duration-300 flex items-center justify-center rounded-full ml-3 w-5 h-5'+translateIcon()}>{'<'}</div>
                </div>
                {isOpen ? <div className={'duration-300 transition-transform duration-300 absolute text-left pl-3 p-3 bg-white text-black z-50 border-2 border-violet min-w-32 w-full left-0 top-9 rounded-xl' +toggleAnimation()}>{variants.map((item) => {
                    if(item!=currentValue){
                        return <p key={item} onClick={()=>{setCurrentValue(item)}} className={'my-2 whitespace-nowrap hover:bg-violet text-violet hover:bg-opacity-5 cursor-pointer border-violet border-b-[1px]'}>{item}</p>
                    }
                })}</div> :null}
            </div>
        </div>
    );
};

export default SelectOptionsList;