import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import SearchInput from './searchInput'
import { PropTypes } from "prop-types"






const SearchBox = forwardRef(
    (
        {
            asyncData,
            loadingMessage = "Loading...",
            noOptionsMessage = "No Result Found",
            options = [
                { content: 'item two', value: 'item two' },
                { content: 'item three', value: 'item three' },
            ],
            onSelect,
            placeholder = "search...",
            id = "searchBar" + Date.now(),
            floatingLabel = false,
            inputClassName = ""
        },
        ref
    ) => {

        const [focused, setFocused] = useState(false)
        const [inputVal, setInputVal] = useState("")
        const inputRef = useRef();
        const [filteredArr, setFilteredArr] = useState(options)

        const onSelectRes = (e) => {
            setFocused(false)

            setInputVal(e.value)
        }

        const filter = (str) => {
            try {
                if (!str.length > 0) setFilteredArr(options);
                const filtered = options.filter(word => word.includes(str))
                setFilteredArr(filtered)

            } catch (error) {
                throw error
            }
        }
        const onBlur = async (e) => {
            const str = e.relatedTarget?.className || "";
            if (!str.includes("search-result-option")) {
                setFocused(false)
            }

        }

        const renderData = async () => {
            const str = inputRef.current.value
            setFilteredArr([loadingMessage])
            try {
                if (asyncData) {
                    const options = await asyncData(str);
                    setFilteredArr(options)
                }
                else {
                    await setTimeout(async () => { await console.log("sdsd"); }, 2000)
                    filter(str)
                }
            } catch (error) {

            }

        }

        useImperativeHandle(ref, () => ({
            onbulr: onBlur,
            input: {
                value: inputVal,
                ref: inputRef,
                setValue: setInputVal
            },
        }), [inputVal])

        useEffect(() => { renderData() }, [inputVal])
        return (
            <>

                <div
                    className='searchBox'
                >
                    <div className='input-wraper d-flex form-floating'>
                        <div className=''>
                            <i className="p-1 fa fa-search fa-flip-horizontal" aria-hidden="true"></i>
                        </div>
                        <input id={id}
                            onChange={(s) => { setInputVal(s.target.value); }}
                            onBlur={(e) => { onBlur(e) }}
                            onFocus={() => { setFocused(true) }}
                            ref={inputRef}
                            value={inputVal}
                            placeholder={placeholder}
                            className={"w-100" + (floatingLabel ? "form-control" : "") + inputClassName}
                        />
                        {floatingLabel && <label for={id}>{placeholder}</label>}
                    </div>

                    {focused &&
                        <div className='results-container'>
                            {filteredArr.map((i, key) => {
                                return <div key={key} className='search-result-option' tabIndex={1} onClick={() => { onSelectRes(i) }} >{i.content}</div>
                            })}
                        </div>
                    }
                </div >
            </>
        )

    })
SearchBox.propTypes = {
    asyncData: PropTypes.func,
    loadingMessage: PropTypes.string,
    options: PropTypes.object,
    onSelect: PropTypes.func,
    placeholder: PropTypes.string,
    id: PropTypes.string,
    floatingLabel: PropTypes.bool,
    inputClassName: PropTypes.string
}
export default SearchBox