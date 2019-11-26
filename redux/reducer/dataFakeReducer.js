
  const defaultDataKake= [
    {
           Oder_id : 'ORDS01', Odertime : '08:30:2019', status :'INACTIVE', total :'50$', job :'Giao Hàng',
       oder_detail: 
           {Order : 'HC0012', namecustom :'Hoàng Speed', SĐT:'0365725858', address : 'Số 15-ngõ 205-Xuẩn Đỉnh-Hà Nội',
           thanhtoan :'Chưa Thanh Toán' },
           // {Order : 'hc0012', namecustom :'Ngoc Linh', SĐT:'0365725858', address : 'Số 15-ngõ 205-Xuẩn Đỉnh-Hà Nội',
           // thanhtoan :'Chưa Thanh Toán'},
         
   },
   {Oder_id : 'ORDS23', Odertime : '07:30:2019', status :'INACTIVE', total :'30$',job :'Bảo Dưỡng',
       oder_detail: {
         Order : 'HC00199', namecustom :'Lê Văn Huyên ', SĐT:'0265448748', address : 'Số 145-Nguyễn Khánh Toàn - Bắc Giang',
         thanhtoan :'Chưa thanh toán'
       }
     },
     {Oder_id : 'ORDS30', Odertime : '09:30:2019', status :'INACTIVE', total :'108$',job :'Lắp Đặt',
       oder_detail: {
         Order : 'HC00199', namecustom :'Lê Văn Huyên ', SĐT:'026544874', address : 'Số 135-Nguyễn Khánh Toàn - Bắc Giang',
         thanhtoan :'Chưa thanh toán'
       }
     },
   
     {
           Oder_id : 'ORDS05', Odertime : '09:30:2019', status :'INACTIVE', total :'60$',job :'Lắp Đặt',
       oder_detail: {Order : 'HC0014', namecustom :'VuongDanny', SĐT:'0395888385', address : 'Số 17 Khương Trung- Hà Nội',
       thanhtoan :'Đã thanh toán tại quầy'}  
     },
       {
           Oder_id : 'ORDS08', Odertime : '11:30:2019', status :'INACTIVE', total :'80$',job :'Giao Hàng',
       oder_detail:  
           {Order : 'HC0020', namecustom :'Hoàng Mạnh Tuấn', SĐT:'0243754874', address : 'Số 17-Nguyễn Khánh Toàn - Hà Nội',
           thanhtoan :'Đã thanh toán tại quầy'},     
           // { Order : 'hc0020', namecustom :'Hoàng Mạnh Tuấn', SĐT:'0243754874', address : 'Số 17-Nguyễn Khánh Toàn - Hà Nội',
           //  thanhtoan :'Đã thanh toán tại quầy' },
       
     },
       {Oder_id : 'ORDS11', Odertime : '15:30:2019', status :'INACTIVE', total :'100$',job :'Lắp đặt',
       oder_detail: {
         Order : 'HC00199', namecustom :'Lê Văn Luyện', SĐT:'0243754874', address : 'Số 17-Nguyễn Khánh Toàn - Bắc Giang',
         thanhtoan :'Chưa thanh toán'
       }
     },  
     {Oder_id : 'ORDS13', Odertime : '17:30:2019', status :'INACTIVE', total :'100$',job :'Giao Hàng',
       oder_detail: {
         Order : 'HC00199', namecustom :'Lê Văn Huyên ', SĐT:'026544874', address : 'Số 135-Nguyễn Khánh Toàn - Bắc Giang',
         thanhtoan :'Chưa thanh toán'
       }
     }, 
     {Oder_id : 'ORDS17', Odertime : '17:30:2019', status :'INACTIVE', total :'100$',job :'END',
       oder_detail: {
         Order : 'HC00199', namecustom :'Lê Văn Huyên ', SĐT:'026544874', address : 'Số 135-Nguyễn Khánh Toàn - Bắc Giang',
         thanhtoan :'Chưa thanh toán'
       }
     },
   
   ];
   
   
const dataJakeReducer = (state = defaultDataKake, action) => {
if (action.type === 'TOGGLE_BTNJOB') {
    return state.map(e => {
                 if (e.Oder_id !== action.id) return e  
                    if (e.status ==='INACTIVE') return {...e,status:'PROCESSING'};
                    if (e.status ==='PROCESSING') return {...e,status:'COMPLETED'};
                    if (e.status ==='COMPLETED') return {...e,status:'COMPLETED'};                  
            });
}
    

// if (action.type === 'TOGGLE_SHOW') {
//     return state.map(e => {
//         if (e.id !== action.id) return e;
//         return { ...e, isShow: !e.isShow };
//     });
// }
// if (action.type === 'ADD_WORD') {
//     return [{
//         id: state.length + 1,
//         en: action.en,
//         vn: action.vn,
//         memorized: false,
//         isShow: false
//     }].concat(state);
// }
return state;
};

export default  dataJakeReducer;

