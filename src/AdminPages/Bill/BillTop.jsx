import React from "react";
import logo from '../../assets/logo.jpg'

const BillTop = () => {
    return (
        <div>
            <div className="grid grid-cols-3 gap-2">
            <div className="text-start text-sm ml-2 flex flex-col">
                <p>શ્રી ખોડિયાર માતાય નમઃ</p>
                <p>GSTIN.24AAUFJ2741H1Z7</p>
            </div>
            <div className="text-center text-sm">
                <p>શ્રી ગણેશાય નમઃ</p>
                <p className="font-bold text-xl">TAX INVOICE</p>
            </div>
            <div className="text-end text-sm mr-2">
                <p>શ્રી શક્તિ માતાય નમઃ</p>
                <p>લા.નં.SNR/FFR240000794-2024/2</p>
            </div>
            </div>
            <div className="grid grid-cols-5 grid-rows-3">
                <div className="col-span-1 row-span-3">
                    <img src={logo} className="size-32 ml-2" alt="logo" />
                </div>
                <div className="col-span-3 row-span-3 flex flex-col mt-2 text-center">
                    <p className="text-6xl mb-2">જય કિસાન ટ્રેડિંગ</p>
                    <p className="text-lg text-center content-center mt-6">રાસાયણિક ખાતરના વેપારી.</p>
                </div>
                <div className="col-span-1 row-span-3 mr-2 mt-6 flex flex-col text-right text-lg">
                    <p>હકુભાઈ  રાઠોડ</p>
                    <p className="mb-5">મો. ૯૮૨૫૭૩૨૫૩૧</p>
                    <p>સ્ટેટ કોડ ગુજરાત ૨૪</p>
                </div>

            </div>
            <div className="grid grid-cols-3">
                <div className="text-center text-sm col-start-2">
                મુ. લખતર તા. લખતર જી. સુરેન્દ્રનગર
                </div>
                <div className="text-right text-sm flex flex-col col-start-3">
                 <p className="text-lg mr-6">કેશ/ડેબીટ મેમો</p>
                </div>
            </div>
            <hr className="border-1 border-black mb-1" />
            <hr className="border-1 border-black" />

            <div className="grid grid-cols-5">
                <div className="col-span-5 grid grid-cols-5 border-black border-solid">
                <div className="col-span-3 text-left">નામ શ્રી, <hr className="border-black"/></div>
                <div className="col-span-1 text-left">ગામ: <hr className="border-black"/> </div>
                


                
                <div className='col-span-1 flex flex-col text-left'>
                    <div>
                    બિલ નં.<hr className="border-1 border-black"/>
                    </div>
                </div>
                </div>
                <div className="grid grid-cols-5 col-span-5 border-solid border-black">
                <div className="col-span-2 text-left">આધાર નં. <hr className="border-black"/></div>
                <div className="col-span-2 text-left">મો. <hr className="border-black"/> </div>

                <div>
                <div className='col-span-1 flex flex-col text-left'>
                    તારીખ: <hr className="border-1 border-black"/>
                    </div>
                </div>
                </div>
            </div>
            <hr className="border-1 border-black mb-1" />
            <hr className="border-1 border-black" />
        </div>
    )
}

export default BillTop;