import React from 'react'
import './HomePage.css'
import HomeHeaderBar from '../component/HomeHeaderBar'

function HomePage() {
    const starterPrice = "500";
    return (
        <div id="Home-page">
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            <div id="Home-page-body">
                <div id="Home-page-header"><HomeHeaderBar></HomeHeaderBar></div>
                <div id="space-1"></div>
                <div id="container-1">
                    <div id="container-2">
                        <div id="container-3">
                            <div id="container-4">
                                <div className="txt-1">ระบบจัดการคลังวัตถุดิบ</div>
                                <div className="txt-1">เพื่อธุรกิจของคุณ</div>
                                <div className="txt-2">ในราคาเริ่มต้นเพียง <span><b> {starterPrice} บาท</b></span>  *</div>
                                <div className="txt-3"><span>พิเศษ ! </span> ติดต่อเราวันนี้  รับสิทธิ์ใช้โปรแกรมฟรี 1 เดือน</div>
                            </div>
                            <div id="btn-zone">
                                <a href="http://localhost:3000/feature"><button id="home-learn-more-btn">เรียนรู้เพิ่มเติม</button></a>
                                <span></span>
                                <a href="http://localhost:3000/contact-us"><button id="home-contact-us-btn">ติดต่อเรา</button></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="container-5">
                    <div id="container-6">
                        <div className="txt-4">ระบบบริหารจัดการคลังวัตถุดิบ</div>
                        <div className="txt-4">ที่จะช่วยให้กิจการของคุณเติบโตอย่างมั่นคง</div>
                        <div id="container-7">
                            <div className="ads-block">
                                <div className="ads-icon" id="ads-icon-1"></div>
                                <div className="ads-txt">
                                    <h1>ใช้ง่าย ราคาเอื้อมถึง</h1>
                                    <p>Victual Ingredients Management Software<br/>โปรแกรมผู้ช่วยดี ๆ ในราคาที่ทุกร้านเข้าถึงได้</p>
                                </div>
                            </div>
                            <div className="ads-block">
                                <div className="ads-icon" id="ads-icon-2"></div>
                                <div className="ads-txt">
                                    <h1>เพิ่มประสิทธิภาพให้สต็อกของคุณ</h1>
                                    <p>มีระบบช่วยในการอัพเดทรายการวัตถุดิบคงคลัง<br/>ช่วยให้จัดการวัตถุดิบรับเข้า - ใช้ไปได้ดี </p>
                                </div>
                            </div>
                            <div className="ads-block">
                                <div className="ads-icon" id="ads-icon-3"></div>
                                <div className="ads-txt">
                                    <h1>เพิ่มกำไร ลดต้นทุนส่วนเกิน</h1>
                                    <p>ลดการซื้อเข้าของวัตถุดิบที่ไม่จำเป็น<br/>ลดต้นทุนส่วนเกิน เพิ่มกำไรให้ธุรกิจคุณ</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="container-8">
                    <div id="txt-5"><span>เริ่มต้นตอนนี้</span>เพื่อประสิทธิภาพ<br/>ในการบริหารจัดการวัตถุดิบในร้านที่เหนือกว่า</div>
                </div>

                <div id="container-9">
                    <div className="con-9-ad" id="con-9-ad-1">
                        <div className="ad-container">
                            <div id="ad-1-pic"></div>
                            <div id="ad-txt-r">
                                <h1>รองรับการใช้งานบนหลายอุปกรณ์</h1>
                                <p> ไม่ว่าคุณจะต้องการใช้งานบนกี่อุปกรณ์ก็สามารถใช้ได้ <br/> ด้วยส่วนติดต่อผู้ใช้ หรือ user interface ที่มีความยืดหยุ่น <br/>
                                    ไม่ว่าคุณจะใช้งานบน ios หรือ android ใช้งานอุปกรณ์ขนาดเท่าไร <br/> คุณก็สามารถบริหารจัดการวัตถุดิบคงคลังของคุณได้อย่างมีประสิทธิภาพ !
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="con-9-ad">
                        <div className="ad-container">
                            <div id="ad-2-pic"></div>
                            <div id="ad-txt-l">
                                <h1>เติมของได้อย่างไร้รอยต่อ</h1>
                                <p> <b>หมดปัญหาวัตถุดิบหมดสต็อก</b> ผู้ขายสามารถติดตาม<br/> ปริมาณวัตถุดิบคงเหลือในคลังวัตถุดิบ
                                    ได้แบบเรียลไทม์ <br/> อัพเดทปริมาณวัตถุดิบคงคลังอัตโนมัติ
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="con-9-ad">
                        <div className="ad-container">
                            <div id="ad-3-pic"></div>
                            <div id="ad-txt-r">
                                <h1>มาพร้อมระบบแจ้งเตือนของหมด</h1>
                                <p> ทำให้การติดตามผู้ขายเป็นอัตโนมัติเพื่อลดความผิดพลาด <br/><br/>
                                    เมื่อปริมาณวัตถุดิบใด ๆ ในสต็อกหมดหรือคงเหลือในปริมาณน้อยกว่า <br/>
                                    ที่คุณกำหนดระบบจะทำการแจ้งเตือนรวมถึงแสดงผลให้ผคุณเห็น
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="con-9-ad">
                        <div className="ad-container">
                            <div id="ad-4-pic"></div>
                            <div id="ad-txt-l">
                                <h1 style={{lineHeight:"155%"}}>แบ่งหน้าที่พนักงาน <br/> กำหนดการเข้าถึงได้อิสระ</h1>
                                <p> คุณสามารถกำหนดหน้าที่ให้พนักงาน<br/> ของคุณได้เป็นรายบุคคล
                                    เพิ่ม - ลบบัญชีของพนักงาน <br/> พร้อมกำหนดสิทธิ์การจัดการสต็อกได้ด้วยมือคุณ
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                <div id="container-10">
                    <div id="txt-6"><span>Victual Ingredients Management Software</span> เหมาะกับใคร</div>
                    '
                    <div id="con-10-row">
                        <div className="con-10-box">
                            <div className="con-10-box-icon">
                                <div id="for-who-1"></div>
                                <div className="for-who-txt">สำหรับร้านอาหารที่มี 1 สาขา</div>
                            </div>
                        </div>

                        <div className="con-10-box">
                            <div className="con-10-box-icon">
                                <div id="for-who-2"></div>
                                <div className="for-who-txt" id="for-who-txt-2">ร้านที่ต้องการจัดการสต็อกที่มีประสิทธิภาพ</div>
                            </div>
                        </div>

                        <div className="con-10-box" id="con-10-box-3">
                            <div className="con-10-box-icon">
                                <div id="for-who-3"></div>
                                <div className="for-who-txt">เจ้าของร้านอาหารมือใหม่</div>
                            </div>
                        </div>

                    </div>
                </div>

                <div id="container-11">
                    <div id="container-12">
                        <div className="con-12-half">
                            <div className="one-line-for-who">
                                <div className="li-icon"><div className="li-icon-img"><i className="material-icons">check_circle</i></div></div>
                                <div className="one-line-txt">ร้านอาหารที่มี 1 สาขา</div>
                            </div>

                            <div className="one-line-for-who">
                                <div className="li-icon"><div className="li-icon-img"><i className="material-icons">check_circle</i></div></div>
                                <div className="one-line-txt">รองรับการใช้งานฟีเจอร์ออนไลน์</div>
                            </div>

                            <div className="one-line-for-who">
                                <div className="li-icon"><div className="li-icon-img"><i className="material-icons">check_circle</i></div></div>
                                <div className="one-line-txt">ระบบจัดการสินค้าคงคลัง</div>
                            </div>
                            
                            <div className="one-line-for-who">
                                <div className="li-icon"><div className="li-icon-img"><i className="material-icons">check_circle</i></div></div>
                                <div className="one-line-txt">หน้าต่างผู้ใช้เข้าใจง่าย</div>
                            </div>
                        </div>

                        <div className="con-12-half" id="half-2">
                            <div className="one-line-for-who">
                                <div className="li-icon"><div className="li-icon-img"><i className="material-icons">check_circle</i></div></div>
                                <div className="one-line-txt">เมนูรูปภาพ สะดุดตา</div>
                            </div>

                            <div className="one-line-for-who">
                                <div className="li-icon"><div className="li-icon-img"><i className="material-icons">check_circle</i></div></div>
                                <div className="one-line-txt">ระบบจัดการพนักงาน แบ่งใช้ตามหน้าที่</div>
                            </div>

                            <div className="one-line-for-who">
                                <div className="li-icon"><div className="li-icon-img"><i className="material-icons">check_circle</i></div></div>
                                <div className="one-line-txt">จัดความสำคัญวัตถุดิบรายเมนู</div>
                            </div>
                            
                            <div className="one-line-for-who">
                                <div className="li-icon"><div className="li-icon-img"><i className="material-icons">check_circle</i></div></div>
                                <div className="one-line-txt">คำนวณว่าเมนูที่ขายได้จากวัตถุดิบคงคลัง</div>
                            </div>
                        </div>

                    </div>
                </div>

                <div id="container-13">
                    <div id="span-contact">
                        <div id="bg-darker">
                            <div id="txt-7">สมัครใช้ <span>Victual Ingredients Management Software</span> ง่าย ๆ เพียงคลิก</div>
                            <div id="span-contact-btn-zone">
                                <a href="http://localhost:3000/contact-us"><button id="home-contact-us-btn">ติดต่อเรา</button></a>
                            </div>
                            <div id="txt-8">เราจะติดต่อคุณกลับภายใน 24 ชั่วโมง</div>
                        </div>
                    </div>
                </div>

                <div id="container-14">
                    <div id="con-14-inner">
                        <div id="con-14-content">
                            <div id="what-is-it">
                                <div id="txt-9">Victual Ingredients Management Software คืออะไร</div>
                                <p> ระบบจัดการร้านอาหารที่จะเป็นผู้ช่วยให้คุณในการดูแลสต็อกวัตถุดิบให้กับร้านอาหาร 
                                    ซึ่งจะทำให้ร้านของคุณมีระบบการจัดการ <br/> ที่รวดเร็ว สะดวกสบาย เช็กปริมาณวัตถุดิบคงคลัง
                                    real - time ทุกที่ทุกเวลา ใช้งานได้บนทุกอุปกรณ์  สามารถแบ่งหน้าที่เกี่ยวกับ<br/>การจัดการสต็อก
                                    ให้พนักงาน จัดลำดับความสำคัญวัตถุดิบในแต่ละเมนูได้ ทำให้ธุรกิจของคุณคืนกำไรจากต้นทุนวัตถุดิบส่วนเกิน<br/>
                                    และช่วยเพิ่มประสิทธิภาพการจัดการวัตถุดิบของคุณ </p>

                                <a href="http://localhost:3000/contact-us" id="s-cont-btn">
                                    ติดต่อเรา 
                                    <span className="material-icons">chevron_right</span>
                                </a>
                            </div>
                        </div>
                        <div id="con-14-deco"></div>
                    </div>
                </div>

                <div id="footer">
                    <div id="footer-inner">
                        <div id="footer-SW-name">Victual Ingredients Management Software</div>
                        <div id="creator">
                            จัดทำโดย
                            <div id="creator-detail">
                                <div id="creator-ID">
                                    64010574<br/>64010755
                                </div>
                                <div id="creator-Fname">
                                    พัชร์ธมน<br/>วรชนนท์
                                </div>
                                <div id="creator-Lname">
                                    พงศกรพิสิฐ<br/>ชัยประเสริฐสุด
                                </div>
                            </div>
                        </div>
                        <div id="footer-pic"></div>
                    </div>
                    <div id="credit">2024 KMITL CEPP : Victual Ingredients Management Software </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage