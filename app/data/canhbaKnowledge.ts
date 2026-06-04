export type CardGroup = "Dân làng" | "Ma" | "Bảo vật" | "Quản trò";

export type CanhBaCard = {
    id: string;
    name: string;
    aliases: string[];
    group: CardGroup;
    isPlayable: boolean;
    shortFunction: string;
    fullFunction: string;
    easyExplain: string;
    example?: string;
};

export const canhbaKnowledge = {
    gameName: "Canh Ba",

    answerRules: [
        "Luôn trả lời bằng tiếng Việt, dễ hiểu, ngắn gọn.",
        "Chỉ trả lời dựa trên dữ liệu thẻ và luật được cung cấp.",
        "Không tự bịa thêm chức năng thẻ.",
        "Nếu người chơi hỏi tình huống chưa có trong dữ liệu, hãy nói: 'Tình huống này chưa có luật ưu tiên rõ trong dữ liệu hiện tại.'",
        "Khi giải thích thẻ, ưu tiên cấu trúc: Tên thẻ → Nhóm thẻ → Chức năng dễ hiểu → Ví dụ nếu cần.",
        "Nếu có xung đột giữa bản mô tả dài và bản chức năng ngắn, ưu tiên bản chức năng ngắn đã chuẩn hóa.",
    ],

    generalRules: [
        "Canh Ba là board game suy luận, nhập vai và tranh luận.",
        "Bộ bài gồm 3 nhóm chính: Dân làng, Ma và Bảo vật.",
        "Thầy Đồ là người điều khiển ván chơi, không tham gia như người chơi thường.",
        "Các kỹ năng gây hại, soi, bảo vệ, cấm kỹ năng, bỏ phiếu phải được xử lý theo thứ tự luật do Thầy Đồ công bố trước ván.",
    ],

    cards: [
        {
            id: "ba-tam",
            name: "Bà Tám",
            aliases: ["ba tam", "bà tám"],
            group: "Dân làng",
            isPlayable: true,
            shortFunction: "Lá phiếu của bạn được tính gấp đôi khi bỏ phiếu.",
            fullFunction:
                "Bà Tám có tiếng nói rất có trọng lượng trong chợ. Lá phiếu của Bà Tám được tính gấp đôi khi bỏ phiếu.",
            easyExplain:
                "Khi tới lượt bỏ phiếu, phiếu của Bà Tám được tính là 2 phiếu thay vì 1 phiếu.",
            example:
                "Nếu Bà Tám vote loại một người, lá phiếu đó được tính như 2 người cùng vote.",
        },
        {
            id: "ong-hoi-dong",
            name: "Ông Hội Đồng",
            aliases: ["ong hoi dong", "ông hội đồng", "hoi dong"],
            group: "Dân làng",
            isPlayable: true,
            shortFunction:
                "Một lần trong ván, khi có người bị bỏ phiếu loại, bạn có thể cứu họ với 50% thành công.",
            fullFunction:
                "Một lần trong ván, khi có người bị vote chết, Ông Hội Đồng có thể cứu họ với tỉ lệ 50-50.",
            easyExplain:
                "Ông Hội Đồng có một lần can thiệp khi một người sắp bị loại bởi bỏ phiếu. Kết quả cứu thành công hay không là 50-50.",
            example:
                "Nếu dân làng vote loại Bà Đồng, Ông Hội Đồng có thể dùng quyền cứu. Nếu thành công, Bà Đồng không bị loại.",
        },
        {
            id: "co-ut-cheo-xuong",
            name: "Cô Út Chèo Xuồng",
            aliases: ["co ut", "cô út", "co ut cheo xuong", "cô út chèo xuồng"],
            group: "Dân làng",
            isPlayable: true,
            shortFunction:
                "Chọn 1 người. Bạn sẽ biết người đó có sử dụng kỹ năng hay không.",
            fullFunction:
                "Mỗi đêm, chọn 1 người để theo dõi. Sang canh sau, Thầy Đồ cho biết người đó có dùng năng lực hay không.",
            easyExplain:
                "Cô Út không biết người đó là phe nào, chỉ biết trong đêm/canh đó người được chọn có dùng kỹ năng hay không.",
            example:
                "Cô Út chọn Ma Đói. Nếu Ma Đói có dùng kỹ năng, sang canh sau Thầy Đồ báo là người đó có sử dụng kỹ năng.",
        },
        {
            id: "ngoai-lanh-dan-chieu",
            name: "Ngoại Lành Đan Chiếu",
            aliases: [
                "ngoai lanh",
                "ngoại lành",
                "ngoai lanh dan chieu",
                "ngoại lành đan chiếu",
            ],
            group: "Dân làng",
            isPlayable: true,
            shortFunction: "Chọn 1 người. Người đó không thể bị soi trong đêm.",
            fullFunction:
                "Chọn 1 người chơi. Chức năng của người đó không thể bị soi khi Vong tụ về.",
            easyExplain:
                "Ngoại Lành giúp che người được chọn khỏi các kỹ năng soi/kiểm tra thân phận trong đêm đó.",
            example:
                "Nếu Ngoại Lành chọn Ông Từ, đêm đó Bà Đồng soi Ông Từ thì việc soi không có hiệu lực.",
        },
        {
            id: "sau-ruou",
            name: "Sâu Rượu",
            aliases: ["sau ruou", "sâu rượu"],
            group: "Dân làng",
            isPlayable: true,
            shortFunction: "Bạn có thể giết 1 người, chỉ dùng được 1 lần.",
            fullFunction:
                "Tính khí nóng nảy. Khi say rượu, Sâu Rượu có thể giết 1 người, chỉ 1 lần.",
            easyExplain:
                "Sâu Rượu có một lần duy nhất để tấn công và loại một người trong ván.",
            example:
                "Sâu Rượu dùng kỹ năng chọn Ma Nữ. Nếu không bị chặn, Ma Nữ bị loại.",
        },
        {
            id: "ba-dong",
            name: "Bà Đồng",
            aliases: ["ba dong", "bà đồng"],
            group: "Dân làng",
            isPlayable: true,
            shortFunction: "Mỗi canh, soi 1 người để biết thân phận.",
            fullFunction:
                "Bà Đồng có khả năng nhìn thấy sự thật ẩn giấu. Mỗi canh, Bà Đồng có thể kiểm tra thân phận của một người chơi.",
            easyExplain:
                "Mỗi canh, Bà Đồng chọn một người để kiểm tra họ là Dân hay Ma.",
            example:
                "Bà Đồng soi Ma Da thì bình thường sẽ biết người đó thuộc phe Ma, trừ khi có hiệu ứng che thân phận.",
        },
        {
            id: "kep-hat",
            name: "Kép Hát",
            aliases: ["kep hat", "kép hát"],
            group: "Dân làng",
            isPlayable: true,
            shortFunction:
                "Chọn 1 người để kết giao. Nếu một trong hai bị loại, người còn lại biết phe của người kia.",
            fullFunction:
                "Kép Hát có thể kết giao với một người khác. Nếu một trong hai người bị loại, người còn lại sẽ biết được phe của người kia.",
            easyExplain:
                "Kép Hát tạo liên kết với một người. Khi một trong hai rời ván, người còn lại được biết phe thật của người kia.",
            example:
                "Kép Hát kết giao với Ma Đói. Nếu Kép Hát bị loại, Ma Đói biết phe của Kép Hát.",
        },
        {
            id: "ong-tu",
            name: "Ông Từ",
            aliases: ["ong tu", "ông từ"],
            group: "Dân làng",
            isPlayable: true,
            shortFunction:
                "Mỗi canh, bảo vệ 1 người. Người đó không bị ảnh hưởng bởi kỹ năng gây hại.",
            fullFunction:
                "Mỗi canh, chọn 1 người chơi để bảo vệ. Người đó không bị ảnh hưởng bởi các năng lực gây hại trong canh đó.",
            easyExplain:
                "Ông Từ chọn một người để bảo vệ khỏi các kỹ năng gây hại trong canh đó.",
            example:
                "Nếu Ông Từ bảo vệ Bà Đồng, Ma tấn công Bà Đồng trong canh đó thì Bà Đồng không chết.",
        },
        {
            id: "ba-tu-nhang",
            name: "Bà Tư Nhang",
            aliases: ["ba tu nhang", "bà tư nhang"],
            group: "Dân làng",
            isPlayable: true,
            shortFunction:
                "Khi bị loại, chọn 1 người. Canh sau, người đó không dùng được kỹ năng.",
            fullFunction:
                "Khi bị loại, chọn 1 người chơi để ám. Người đó không thể dùng năng lực trong canh tiếp theo.",
            easyExplain:
                "Nếu Bà Tư Nhang bị loại, bà có thể ám một người để người đó mất kỹ năng ở canh sau.",
            example:
                "Bà Tư Nhang bị vote chết và chọn Ma Da. Canh sau Ma Da không dùng được kỹ năng.",
        },
        {
            id: "su-thay",
            name: "Sư Thầy",
            aliases: ["su thay", "sư thầy"],
            group: "Dân làng",
            isPlayable: true,
            shortFunction:
                "Có 2 mạng. Lần đầu bị Ma tấn công thì không chết, Ma mất năng lực canh sau.",
            fullFunction:
                "Có 2 mạng. Nếu bị Ma tấn công lần đầu, Sư Thầy không chết và Ma mất năng lực trong canh tiếp theo.",
            easyExplain:
                "Sư Thầy sống sót sau lần đầu bị Ma tấn công. Con Ma tấn công Sư Thầy sẽ bị mất kỹ năng ở canh kế tiếp.",
            example:
                "Ma Nữ tấn công Sư Thầy lần đầu. Sư Thầy không chết, Ma Nữ canh sau không được dùng kỹ năng.",
        },
        {
            id: "thay-do",
            name: "Thầy Đồ",
            aliases: ["thay do", "thầy đồ", "quan tro", "quản trò"],
            group: "Quản trò",
            isPlayable: false,
            shortFunction:
                "Quản lý ván chơi, công bố kết quả. Không tham gia và không tiết lộ bí mật.",
            fullFunction:
                "Người điều khiển ván chơi và công bố các sự kiện. Thầy Đồ không tham gia trò chơi và không tiết lộ thông tin bí mật.",
            easyExplain:
                "Thầy Đồ là người dẫn game, gọi lượt, nhận hành động bí mật và công bố kết quả phù hợp.",
            example:
                "Thầy Đồ gọi Bà Đồng dậy để soi, sau đó ghi nhận kết quả và công bố thông tin khi đến lượt.",
        },
        {
            id: "thay-hot-thuoc-nam",
            name: "Thầy Hốt Thuốc Nam",
            aliases: [
                "thay hot thuoc nam",
                "thầy hốt thuốc nam",
                "thay thuoc nam",
            ],
            group: "Dân làng",
            isPlayable: true,
            shortFunction: "Có 2 thuốc: cứu 1 người và giết 1 người. Mỗi loại dùng 1 lần.",
            fullFunction:
                "Có 2 thuốc: Cứu 1 người và giết 1 người. Mỗi loại chỉ dùng 1 lần.",
            easyExplain:
                "Thầy Hốt Thuốc Nam có một lần cứu và một lần giết trong cả ván.",
            example:
                "Một đêm có người bị tấn công, Thầy Hốt Thuốc Nam có thể dùng thuốc cứu để giữ người đó sống.",
        },
        {
            id: "lu-khach",
            name: "Lữ Khách",
            aliases: ["lu khach", "lữ khách"],
            group: "Dân làng",
            isPlayable: false,
            shortFunction: "Không có kỹ năng. Quan sát, suy luận và bỏ phiếu.",
            fullFunction:
                "Không có năng lực đặc biệt. Quan sát, suy luận và bỏ phiếu để tìm ra phe Ma.",
            easyExplain:
                "Lữ Khách không có kỹ năng riêng, thắng bằng quan sát, suy luận và bỏ phiếu chính xác.",
            example:
                "Lữ Khách cần lắng nghe tranh luận để tìm ai có dấu hiệu là Ma.",
        },

        {
            id: "thien-linh-cai",
            name: "Thiên Linh Cái",
            aliases: ["thien linh cai", "thiên linh cái"],
            group: "Ma",
            isPlayable: true,
            shortFunction:
                "Mỗi canh chọn 1 Ma. Đêm đó, nếu Ma được chọn bị soi thì hiện là Dân.",
            fullFunction:
                "Thiên Linh Cái có thể che giấu thân phận của một Ma khác. Mỗi canh, Thiên Linh Cái chọn một Ma. Nếu người đó bị Bà Đồng soi, sẽ soi ra là Người.",
            easyExplain:
                "Thiên Linh Cái giúp che thân phận cho một Ma khác, khiến Ma đó bị soi ra là Dân trong đêm/canh đó.",
            example:
                "Thiên Linh Cái chọn Ma Da. Nếu Bà Đồng soi Ma Da trong canh đó, kết quả hiện là Dân.",
        },
        {
            id: "vong-nhi",
            name: "Vong Nhi",
            aliases: ["vong nhi", "vong nhi"],
            group: "Ma",
            isPlayable: true,
            shortFunction:
                "Mỗi canh chọn 1 người. Canh sau, họ không dùng được kỹ năng.",
            fullFunction:
                "Mỗi canh chọn 1 người chơi, người đó không thể sử dụng chức năng trong canh sau.",
            easyExplain:
                "Vong Nhi khóa kỹ năng của một người ở canh sau.",
            example:
                "Vong Nhi chọn Bà Đồng ở canh 2. Sang canh 3, Bà Đồng không được soi.",
        },
        {
            id: "ma-lon",
            name: "Ma Lon",
            aliases: ["ma lon", "ma lon"],
            group: "Ma",
            isPlayable: true,
            shortFunction: "Mỗi canh có thể giết 1 người.",
            fullFunction: "Mỗi canh có thể giết 1 người.",
            easyExplain:
                "Ma Lon có thể chọn một người để tấn công và loại khỏi ván mỗi canh, nếu không bị chặn.",
            example: "Ma Lon chọn Bà Tám. Nếu không ai bảo vệ, Bà Tám bị loại.",
        },
        {
            id: "ma-nu",
            name: "Ma Nữ",
            aliases: ["ma nu", "ma nữ"],
            group: "Ma",
            isPlayable: true,
            shortFunction: "Mỗi canh có thể giết 1 người.",
            fullFunction: "Mỗi canh có thể giết 1 người.",
            easyExplain:
                "Ma Nữ có thể chọn một người để tấn công và loại khỏi ván mỗi canh, nếu không bị chặn.",
            example: "Ma Nữ chọn Ông Từ. Nếu không có bảo vệ, Ông Từ bị loại.",
        },
        {
            id: "than-trung",
            name: "Thần Trùng",
            aliases: ["than trung", "thần trùng"],
            group: "Ma",
            isPlayable: true,
            shortFunction:
                "Canh 6, ám 1 người. Nếu được cứu, người đó không chết và bạn bị loại.",
            fullFunction:
                "Có thể ám 1 người vào canh 6. Nếu Thầy Hốt Thuốc Nam giải được bùa trùng, người bị ám sẽ không chết, đồng thời Thần Trùng chết ngay lập tức.",
            easyExplain:
                "Đến canh 6, Thần Trùng chọn một người để ám. Nếu Thầy Hốt Thuốc Nam cứu/giải được, người bị ám sống và Thần Trùng chết.",
            example:
                "Canh 6, Thần Trùng ám Bà Đồng. Nếu Thầy Hốt Thuốc Nam cứu Bà Đồng, Bà Đồng không chết và Thần Trùng bị loại.",
        },
        {
            id: "ma-doi",
            name: "Ma Đói",
            aliases: ["ma doi", "ma đói"],
            group: "Ma",
            isPlayable: true,
            shortFunction: "Thắng khi còn 3 người sống và có bạn.",
            fullFunction:
                "Mỗi canh chọn 1 người. Nếu người đó chết, canh sau Ma Đói được quyền giết thêm 1 người. Nếu không, canh sau không được tấn công. Thắng khi còn 3 người sống sót và Ma Đói là một trong số đó.",
            easyExplain:
                "Ma Đói là Ma có điều kiện thắng riêng. Nếu trong ván chỉ còn 3 người sống và Ma Đói vẫn còn sống, Ma Đói thắng.",
            example:
                "Nếu cuối canh còn 3 người sống gồm Ma Đói và 2 người khác, Ma Đói đạt điều kiện thắng.",
        },
        {
            id: "than-vong",
            name: "Thần Vòng",
            aliases: ["than vong", "thần vòng"],
            group: "Ma",
            isPlayable: true,
            shortFunction:
                "Chỉ ám người ngồi cạnh người chết. Canh sau, người đó không được nói và bỏ phiếu.",
            fullFunction:
                "Chỉ ám người ngồi cạnh người chết. Người bị ám không được trò chuyện và bỏ phiếu trong canh kế tiếp.",
            easyExplain:
                "Thần Vòng chỉ được chọn người ngồi cạnh người vừa chết. Người bị ám mất quyền nói và quyền vote ở canh sau.",
            example:
                "Nếu người ở ghế số 3 chết, Thần Vòng có thể ám ghế số 2 hoặc số 4.",
        },
        {
            id: "ma-da",
            name: "Ma Da",
            aliases: ["ma da", "ma da"],
            group: "Ma",
            isPlayable: true,
            shortFunction: "Đầu game chọn 1 người. Nếu bạn chết, người đó chết theo.",
            fullFunction:
                "Khi ván bắt đầu, chọn 1 người chơi để gắn kết. Nếu Ma Da tiêu diệt, người đó chết theo ngay lập tức.",
            easyExplain:
                "Ma Da gắn kết với một người từ đầu game. Khi Ma Da bị tiêu diệt, người bị gắn kết sẽ chết theo.",
            example:
                "Đầu game Ma Da chọn Bà Tám. Nếu Ma Da bị loại, Bà Tám cũng chết theo.",
        },
        {
            id: "quy-nhap-trang",
            name: "Quỷ Nhập Tràng",
            aliases: ["quy nhap trang", "quỷ nhập tràng"],
            group: "Ma",
            isPlayable: true,
            shortFunction:
                "1 lần duy nhất, nhập vào người chết để dùng kỹ năng của họ. Thắng khi trở thành người sống cuối cùng.",
            fullFunction:
                "Khi có người chết do bỏ phiếu, Quỷ Nhập Tràng có thể nhập vào xác đó 1 lần và sử dụng chức năng của người đó.",
            easyExplain:
                "Quỷ Nhập Tràng có thể nhập vào một người vừa chết do bỏ phiếu để dùng kỹ năng của họ. Kỹ năng này chỉ dùng một lần.",
            example:
                "Nếu Bà Đồng bị vote chết, Quỷ Nhập Tràng có thể nhập vào Bà Đồng để sử dụng khả năng soi.",
        },
        {
            id: "ma-xo",
            name: "Ma Xó",
            aliases: ["ma xo", "ma xó"],
            group: "Ma",
            isPlayable: true,
            shortFunction: "Mỗi canh soi 1 người để xem có phải Bà Đồng không.",
            fullFunction: "Mỗi canh chọn 1 người để soi. Chỉ soi ra được Bà Đồng.",
            easyExplain:
                "Ma Xó không soi phe chung. Nó chỉ kiểm tra một người có phải Bà Đồng hay không.",
            example:
                "Ma Xó soi Bà Tám thì kết quả là không phải Bà Đồng. Nếu soi đúng Bà Đồng thì biết đó là Bà Đồng.",
        },

        {
            id: "quat-nan",
            name: "Quạt Nan",
            aliases: ["quat nan", "quạt nan"],
            group: "Bảo vật",
            isPlayable: true,
            shortFunction:
                "Khi chợ tắt đèn, chọn 1 người. Người đó không dùng được kỹ năng.",
            fullFunction:
                "Chọn 1 người khi chợ tắt đèn, làm họ không sử dụng được chức năng của mình.",
            easyExplain:
                "Quạt Nan dùng để chặn kỹ năng của một người trong canh/đêm đó.",
            example:
                "Nếu Quạt Nan chọn Ma Nữ, Ma Nữ không thể giết người trong canh đó.",
        },
        {
            id: "chieu",
            name: "Chiếu",
            aliases: ["chieu", "chiếu", "chieu dinh yen", "chiếu định yên"],
            group: "Bảo vật",
            isPlayable: true,
            shortFunction:
                "Miễn quyền vote của 1 người trong bí mật. Khi người đó vote thì không tính.",
            fullFunction:
                "Miễn quyền vote của 1 người trong bí mật. Khi người đó vote thì không tính.",
            easyExplain:
                "Chiếu làm cho phiếu vote của một người không được tính, nhưng việc này diễn ra bí mật.",
            example:
                "Nếu Chiếu chọn Bà Tám, khi Bà Tám vote thì phiếu đó không được tính.",
        },
        {
            id: "den-dau",
            name: "Đèn Dầu",
            aliases: ["den dau", "đèn dầu"],
            group: "Bảo vật",
            isPlayable: true,
            shortFunction:
                "Dùng ban đêm. Biết số người đã dùng kỹ năng, không biết là ai.",
            fullFunction:
                "Dùng ban đêm. Bạn được biết số lượng người đã dùng năng lực trong đêm, không biết cụ thể là ai.",
            easyExplain:
                "Đèn Dầu cho biết tổng số người đã dùng kỹ năng trong đêm đó, nhưng không tiết lộ danh tính.",
            example:
                "Thầy Đồ báo có 3 người đã dùng kỹ năng trong đêm, nhưng không nói là ai.",
        },
        {
            id: "thung",
            name: "Thúng",
            aliases: ["thung", "thúng"],
            group: "Bảo vật",
            isPlayable: true,
            shortFunction: "Yêu cầu 1 người nói thêm 15 giây để giải thích ý của họ.",
            fullFunction: "Yêu cầu 1 người nói thêm 15 giây để giải thích ý của họ.",
            easyExplain:
                "Thúng cho một người thêm 15 giây nói để giải thích, biện minh hoặc thuyết phục người khác.",
            example:
                "Trước khi vote, người giữ Thúng yêu cầu Bà Đồng nói thêm 15 giây.",
        },
        {
            id: "guoc",
            name: "Guốc",
            aliases: ["guoc", "guốc"],
            group: "Bảo vật",
            isPlayable: true,
            shortFunction: "Khi bỏ phiếu, vote của bạn luôn là Cứu.",
            fullFunction: "Khi bỏ phiếu, vote của bạn luôn là Cứu.",
            easyExplain:
                "Người giữ Guốc không thể vote theo hướng loại, phiếu của họ luôn được tính là Cứu.",
            example:
                "Dù người giữ Guốc muốn vote loại, lá phiếu vẫn được tính là Cứu.",
        },
        {
            id: "ghe",
            name: "Ghe",
            aliases: ["ghe"],
            group: "Bảo vật",
            isPlayable: true,
            shortFunction: "Chỉ định 2 người hoán đổi vị trí chỗ ngồi với nhau.",
            fullFunction: "Chỉ định 2 người hoán đổi vị trí chỗ ngồi với nhau.",
            easyExplain:
                "Ghe đổi chỗ ngồi của hai người. Kỹ năng này có thể ảnh hưởng đến các thẻ phụ thuộc vị trí ngồi.",
            example:
                "Nếu Thần Vòng chỉ ám người ngồi cạnh người chết, Ghe có thể làm thay đổi người ngồi cạnh.",
        },
        {
            id: "non-la",
            name: "Nón Lá",
            aliases: ["non la", "nón lá"],
            group: "Bảo vật",
            isPlayable: true,
            shortFunction: "Lượt vote được x2 trong canh.",
            fullFunction: "Lượt vote được x2 trong canh.",
            easyExplain:
                "Nón Lá làm lá phiếu của người giữ nó được nhân đôi trong canh đó.",
            example:
                "Nếu người giữ Nón Lá vote loại Ma Xó, phiếu đó tính là 2 phiếu.",
        },
        {
            id: "khan-ran",
            name: "Khăn Rằn",
            aliases: ["khan ran", "khăn rằn"],
            group: "Bảo vật",
            isPlayable: true,
            shortFunction: "Bạn có thể giảm 1 phiếu vote vào mình.",
            fullFunction: "Bạn có thể giảm 1 phiếu vote vào mình.",
            easyExplain:
                "Khăn Rằn giúp người giữ nó giảm bớt 1 phiếu đang nhắm vào mình.",
            example:
                "Nếu bạn bị 4 phiếu vote, dùng Khăn Rằn thì chỉ còn tính 3 phiếu.",
        },
        {
            id: "tho",
            name: "Thơ",
            aliases: ["tho", "thơ"],
            group: "Bảo vật",
            isPlayable: true,
            shortFunction: "Thầy Đồ chỉ ra 3 người, trong đó có Ma.",
            fullFunction: "Thầy Đồ chỉ lối cho ta. Ba người được chỉ, có Ma trong này.",
            easyExplain:
                "Thơ đưa ra một nhóm 3 người, trong nhóm đó chắc chắn có ít nhất 1 Ma.",
            example:
                "Thầy Đồ chỉ Bà Tám, Ma Da và Ông Từ. Điều đó nghĩa là trong 3 người này có ít nhất 1 Ma.",
        },
    ],
};