import { React, useEffect, useState } from 'react'

export default function LoadWrap(props) {
    const [status, setStatus] = useState("pending")
    // const getter = props.getter()


    // const myPromise = new Promise((resolve, reject) => {

    //     const data = props.getter()
    //     resolve(data)


    // }).then(
    //     (good) => { console.log(good); },
    //     (bad) => { console.error(bad) }
    // )


    // const data = async () => {

    // }

    const render = async () => {
        if (status === "pending") {
            try {
                const da = await props.getter()
                console.log("good", status);
                setStatus("sucsses")
            } catch (error) {
                setStatus("deny")
                console.log("error", status);
            }
        }
    }
    useEffect(() => {
   
    },[])
    // try {
    //     await props.getter()
    // } catch (err) {
    //     console.log();
    // }

    return (
        <>

            {status === "pending" && props.loader}

            {status === "sucsses" && props.element}
            {status === "deny" && props.errorElement}

        </>
    )
}

