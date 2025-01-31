import { useState } from "react";

const AboutUs = () => {
    const [isClicked , setIsClicked] = useState(false);
    return (
        <>
        <div className=" d-flex" style={{ minHeight: "100vh" }}>
            <div className=" m-auto d-flex justify-content-center align-items-center card" style={{ maxWidth: "800px" }}>
                <div className="row g-0">
                    <div className="col-md-6">
                        <div className="card-body">
                            <h1 className="card-title">About Us</h1>
                            <p className="card-text">تارجت او الشركة الهندسية للأصلاح و التوريد هي شركة مساهمة مصرية تم تأسيسها عن طريق المهندس المصري عصام مسلم عام  1996- وتقوم الشركة برفع كفائة واصلاح و توريد جميع انواع الجرارت و المعدات الثقيلة و تقوم الشركة ايضا بتصنيع جميع انواع المظلات الخاصة بمحطات الوقود طبقا لأعلى مواصفات فنية وتقنية فائقة الجودة بالأضافة الى توريد احدث ماكينات الضخ الخاصة بمحطات الوقود.</p>
                            <button onClick={() => setIsClicked(!isClicked)}>
                                "معلومات عن صاحب الشركة"
                            </button>
                            
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img
                            src="https://target-for-engineering.com/wp-content/uploads/2021/03/WhatsApp-Image-2021-03-30-at-10.38.03-AM.jpeg"
                            alt="Random"
                            className="img-fluid"
                            style={{
                                transition: "all 0.5s ease-in-out",
                                transform: isClicked ? "scale(1.1)" : "scale(1)"
                            }}
                            onLoad={() => {
                                setIsClicked(false);
                            }}
                        />
                    </div>
                </div>    
            </div>
            <p className={isClicked ? "d-felx card col-md-4 m-auto" : "d-none" } >
            مؤسس الشركة هو المهندس المصري/عصام مسلم حامد عقيد سابق في القوات المسلحة المصرية وقد أسس الشركة
            للمساهمة في رفع كفائة الجرارات و المحركات و المعدات الخاصة والحكومية و القيام ببنية تحتية من محطات
            الوقود و المظلات لتواكب التطور الحاصل في باقي المجالات الانشائية و التنموية في البلاد
        </p>
        </div>
       

        </>
    );
};

export default AboutUs;
