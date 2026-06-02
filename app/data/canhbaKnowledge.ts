export type CardGroup = "Dân làng" | "Ma" | "Bảo vật";

export type CanhBaCard = {
    id: string;
    name: string;
    group: CardGroup;
    functionText: string;
    story?: string;
};

export const canhbaKnowledge = {
    gameName: "Canh Ba",

    rules: [
        "Canh Ba là board game suy luận, nhập vai và tranh luận.",
        "Bộ bài gồm 3 nhóm chính: Dân làng, Ma và Bảo vật.",
        "Chatbot chỉ giải thích theo dữ liệu luật/thẻ được cung cấp.",
        "Nếu chưa có dữ liệu luật cho tình huống, phải nói rõ chưa có trong dữ liệu hiện tại.",
        "Không tự tạo thêm chức năng mới cho thẻ.",
    ],

    cards: [
        {
            id: "ma-doi",
            name: "Ma Đói",
            group: "Ma",
            functionText: "Thắng khi còn 3 người sống và có bạn.",
            story:
                "Ma Đói là những linh hồn bị bỏ đói, lang thang trong phiên chợ Định Yên lúc Canh Ba.",
        },
        {
            id: "chieu-dinh-yen",
            name: "Chiếu Định Yên",
            group: "Bảo vật",
            functionText:
                "Miễn quyền vote của một người trong bí mật. Khi người đó vote thì lá phiếu không được tính.",
            story:
                "Chiếu là hình ảnh gắn với làng nghề Định Yên, mang ý nghĩa che chở âm thầm.",
        },
        {
            id: "non-la",
            name: "Nón Lá",
            group: "Bảo vật",
            functionText: "Lượt vote của bạn được x2 trong canh.",
            story:
                "Nón lá là vật dụng quen thuộc của người miền Tây, tượng trưng cho sự kín đáo và tiếng nói âm thầm.",
        },
        {
            id: "vong",
            name: "Võng",
            group: "Bảo vật",
            functionText: "Chọn một người không được quyền vote trong canh đó.",
            story:
                "Võng gợi cảm giác nghỉ ngơi và bình yên, nhưng trong Canh Ba nó khiến một người tạm thời lặng đi.",
        },
        {
            id: "den-dau",
            name: "Đèn Dầu",
            group: "Bảo vật",
            functionText:
                "Dùng ban đêm. Bạn được biết số lượng người đã dùng năng lực đêm, nhưng không biết cụ thể là ai.",
            story:
                "Đèn dầu soi sáng bóng tối và hé lộ những điều bị che giấu trong đêm.",
        },
        {
            id: "ghe",
            name: "Ghe",
            group: "Bảo vật",
            functionText: "Chỉ định 2 người hoán đổi vị trí chỗ ngồi với nhau.",
            story:
                "Ghe là linh hồn miền sông nước, chở theo cuộc sống, ký ức và bí mật.",
        },
        {
            id: "khan-ran",
            name: "Khăn Rằn",
            group: "Bảo vật",
            functionText: "Bạn có thể giảm 1 phiếu vote vào mình.",
            story:
                "Khăn rằn là biểu tượng Nam Bộ, che đi một phần ánh nhìn soi xét của dân làng.",
        },
    ],
};