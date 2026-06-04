"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type CardGroup = "all" | "dan-lang" | "ma" | "bao-vat";

type GameCard = {
    id: string;
    name: string;
    group: Exclude<CardGroup, "all">;
    groupLabel: string;
    image: string;
    functionText: string;
    story?: string;
};

const filters: { id: CardGroup; label: string }[] = [
    { id: "all", label: "Tất cả" },
    { id: "dan-lang", label: "Dân làng" },
    { id: "ma", label: "Ma" },
    { id: "bao-vat", label: "Bảo vật" },
];

const cards: GameCard[] = [
    {
        id: "chieu-dinh-yen",
        name: "Chiếu Định Yên",
        group: "bao-vat",
        groupLabel: "Bảo vật",
        image: "/images/cards/chieu-dinh-yen.jpg",
        functionText:
            "Miễn quyền vote của một người trong bí mật. Khi người đó vote thì lá phiếu không được tính.",
        story: `Chiếu là hình ảnh gắn liền với làng nghề Định Yên, nơi từng nổi tiếng với nghề dệt chiếu thủ công.

Trong đời sống miền Tây, tấm chiếu không chỉ để nằm hay ngồi ăn cơm, mà còn là nơi cả nhà quây quần, nghe chuyện xóm làng, đờn ca tài tử và nghỉ ngơi sau một ngày lao động.

Trong game, Chiếu trở thành bảo vật mang ý nghĩa che chở âm thầm, giúp người giữ nó có thể bỏ phiếu trong bí mật mà không bị người khác phát hiện.`,
    },
    {
        id: "non-la",
        name: "Nón Lá",
        group: "bao-vat",
        groupLabel: "Bảo vật",
        image: "/images/cards/non-la.jpg",
        functionText: "Lượt vote của bạn được nhân đôi trong canh.",
        story: `Nón lá là vật dụng quen thuộc của người miền Tây, theo các bà, các má, các chị qua những buổi đi chợ, chèo ghe, ra đồng hay đứng bên bến sông chờ nước lớn nước ròng.

Chiếc nón cũ mang cảm giác mộc mạc, gần gũi nhưng cũng ẩn chứa sự kín đáo của người dân quê.

Trong game, Nón Lá giúp lá phiếu của người giữ nó có sức nặng hơn, như thể có thêm một tiếng nói âm thầm đứng về phía họ.`,
    },
    {
        id: "vong",
        name: "Võng",
        group: "bao-vat",
        groupLabel: "Bảo vật",
        image: "/images/cards/vong.jpg",
        functionText: "Chọn một người không được quyền vote trong canh đó.",
        story: `Võng là hình ảnh rất quen thuộc trong đời sống miền Tây, từ tiếng võng kẽo kẹt trưa hè đến lời ru à ơi bên mái lá.

Nó gợi cảm giác nghỉ ngơi, chậm rãi và bình yên sau những ngày làm lụng.

Khi trở thành bảo vật trong Canh Ba, Võng mang năng lực khiến một người tạm thời “lặng đi”, mất quyền bỏ phiếu trong một canh, giống như bị kéo vào một giấc ngủ ngắn giữa phiên chợ đầy nghi ngờ.`,
    },
    {
        id: "tho",
        name: "Thơ",
        group: "bao-vat",
        groupLabel: "Bảo vật",
        image: "/images/cards/tho.jpg",
        functionText:
            "Thầy đồ chỉ lối cho ta. Ba người được chỉ, chắc chắn có Ma trong này.",
        story: `Ở miền Tây xưa, chữ nghĩa, thư tay và những câu thơ thường được xem như vật quý, lưu giữ tình cảm và ký ức của con người.

Bảo vật Thơ là những tờ giấy cũ, nét mực nhòe theo thời gian, gợi cảm giác hoài niệm và huyền bí.

Trong game, Thơ có khả năng chỉ ra ba người, trong đó chắc chắn có một kẻ không còn là người sống, giúp dân làng có thêm manh mối để suy luận.`,
    },
    {
        id: "quat-nan",
        name: "Quạt Nan",
        group: "bao-vat",
        groupLabel: "Bảo vật",
        image: "/images/cards/quat-nan.jpg",
        functionText:
            "Chọn 1 người khi chợ tắt đèn, làm họ không sử dụng được chức năng của mình.",
        story: `Quạt nan là vật dụng bình dị trong mỗi căn nhà miền Tây, gắn với những trưa nóng, tiếng võng đưa và những câu chuyện ma kể dưới ánh đèn dầu.

Khi đêm xuống, chiếc quạt cũ không chỉ xua đi cái nóng mà còn như mang theo một luồng gió lạnh từ cõi âm.

Trong game, Quạt Nan có thể làm một người mất khả năng sử dụng năng lực trong một canh, khiến mọi hành động của họ trở nên vô hiệu.`,
    },
    {
        id: "tui-bo",
        name: "Túi Bố",
        group: "bao-vat",
        groupLabel: "Bảo vật",
        image: "/images/cards/tui-bo.jpg",
        functionText:
            "Bài trừ vote của 2 người được chỉ định trong bí mật.",
        story: `Túi bố gắn với những buổi đi chợ, xuống ghe, đựng gạo, cá khô hoặc những món đồ nhỏ trong đời sống sông nước.

Vẻ ngoài thô ráp, kín đáo của túi bố tạo cảm giác như có thể giấu đi nhiều điều không ai biết.

Trong game, Túi Bố có thể làm mất hiệu lực lá phiếu của hai người bất kỳ, khiến lựa chọn của họ biến mất một cách âm thầm khi kiểm phiếu.`,
    },
    {
        id: "den-dau",
        name: "Đèn Dầu",
        group: "bao-vat",
        groupLabel: "Bảo vật",
        image: "/images/cards/den-dau.jpg",
        functionText:
            "Dùng ban đêm. Bạn được biết số lượng người đã dùng năng lực đêm, nhưng không biết cụ thể là ai.",
        story: `Đèn dầu là biểu tượng của những đêm quê chưa có điện, khi cả nhà ngồi quanh ánh lửa nhỏ nghe tiếng côn trùng, tiếng nước vỗ và những câu chuyện rùng rợn.

Ánh đèn dầu trong Canh Ba không chỉ soi sáng bóng tối mà còn hé lộ những điều bị che giấu.

Trong game, Đèn Dầu giúp người giữ nó biết có bao nhiêu người đã sử dụng năng lực trong đêm, dù không thể biết cụ thể là ai.`,
    },
    {
        id: "ghe",
        name: "Ghe",
        group: "bao-vat",
        groupLabel: "Bảo vật",
        image: "/images/cards/ghe.jpg",
        functionText:
            "Chỉ định 2 người hoán đổi vị trí chỗ ngồi với nhau.",
        story: `Ghe là linh hồn của miền sông nước, gắn với chợ nổi, bến sông, tiếng mái chèo và những chuyến hàng xuôi ngược.

Với người miền Tây, ghe không chỉ là phương tiện đi lại mà còn là nơi chở theo cuộc sống, ký ức và cả những bí mật.

Trong game, Ghe có thể hoán đổi vị trí của hai người, khiến cục diện cuộc họp thay đổi bất ngờ như một chuyến ghe lạc hướng giữa đêm.`,
    },
    {
        id: "guoc",
        name: "Guốc",
        group: "bao-vat",
        groupLabel: "Bảo vật",
        image: "/images/cards/guoc.jpg",
        functionText:
            "Khi bỏ phiếu, vote của bạn luôn là “Cứu”.",
        story: `Tiếng guốc gõ trên nền gạch, cầu ván hay con đường làng là âm thanh quen thuộc trong ký ức miền Tây xưa.

Đôi guốc gợi hình ảnh người phụ nữ quê mộc mạc, kín đáo và thân thương.

Trong game, Guốc khiến lá phiếu của người giữ nó luôn được tính theo hướng “cứu”, như thể từng bước guốc đã âm thầm dẫn lựa chọn của họ đi sang một hướng khác.`,
    },
    {
        id: "khan-ran",
        name: "Khăn Rằn",
        group: "bao-vat",
        groupLabel: "Bảo vật",
        image: "/images/cards/khan-ran.jpg",
        functionText:
            "Bạn có thể giảm 1 phiếu vote vào mình.",
        story: `Khăn rằn là biểu tượng rất đặc trưng của người dân Nam Bộ, gắn với việc đi đồng, chèo ghe, che nắng, lau mồ hôi và giữ ấm trong những đêm gió lạnh.

Chiếc khăn tuy giản dị nhưng thể hiện sự chịu thương chịu khó và bản sắc miền Tây rõ nét.

Trong game, Khăn Rằn giúp người giữ nó giảm bớt một lá phiếu nghi ngờ nhắm vào mình, như thể chiếc khăn đã che đi một phần ánh nhìn soi xét của dân làng.`,
    },
    {
        id: "thung",
        name: "Thúng",
        group: "bao-vat",
        groupLabel: "Bảo vật",
        image: "/images/cards/thung.jpg",
        functionText:
            "Yêu cầu 1 người nói thêm 15 giây để giải thích ý của họ.",
        story: `Thúng là vật dụng quen thuộc trong sinh hoạt miền Tây, dùng để đựng cá, lúa, rau trái hoặc hàng hóa đem ra chợ.

Nó gợi cảm giác đời thường, gần gũi và gắn với nhịp sống lao động của người dân quê.

Trong game, Thúng giúp một người được nói thêm trong thời gian ngắn trước cả làng, tạo cơ hội để họ giải thích, thuyết phục hoặc tự bảo vệ mình trước khi mọi người đưa ra quyết định.`,
    },
    {
        id: "ong-tu",
        name: "Ông Từ",
        group: "dan-lang",
        groupLabel: "Dân làng",
        image: "/images/cards/ong-tu.jpg",
        functionText: "Mỗi canh chọn một người để bảo vệ khỏi điều dữ.",
        story: "Tui là Ông Từ, người coi sóc cái đình cổ ở mé rìa làng Định Yên đã gần trọn một đời.\nCả đời tui quen mùi khói nhang, tiếng mõ khuya, tiếng gió lùa qua mấy cây cột gỗ mục. Người trong làng có thể quên mấy điều kiêng kỵ ông bà để lại, chớ tui thì không dám quên. Bởi có những luật lệ không phải để thờ cúng cho có, mà là để giữ cho người sống còn được yên thân.\nMấy bữa rày, đình có chuyện lạ. Cửa đã khóa, vậy mà ngoài sân vẫn nghe tiếng chân. Đèn dầu tự tắt giữa khuya. Có bóng người đứng nép sau cột cái, áo quần ướt lạnh như mới từ dưới sông lên.\nTui biết, tới Canh Ba, chợ Định Yên không còn là chợ của người sống nữa. Có thứ gì đó đã trà trộn vô làng, đội lốt người quen, nói cười như người quen, nhưng đôi mắt thì lạnh ngắt.\nTui không dám nói lớn. Mỗi canh, tui chỉ lặng lẽ chọn một người để giữ lại, đốt nén nhang, đọc lời khấn cũ, mong che họ khỏi điều dữ.\nNhưng thiệt lòng, tui cũng không chắc mình đang bảo vệ người vô tội… hay đang giữ lại một thứ còn đáng sợ hơn ma."
    },
    {
        id: "ba-dong",
        name: "Bà Đồng",
        group: "dan-lang",
        groupLabel: "Dân làng",
        image: "/images/cards/ba-dong.jpg",
        functionText: "Mỗi canh soi một người để dò xem họ còn thuộc về cõi sống hay đã bị thứ khác trà trộn.",
        story: "Từ hồi còn nhỏ, tui đã thấy được những điều người ta không thấy. Không phải lúc nào cũng là bóng ma hiện ra rõ ràng, mà có khi chỉ là một làn hơi lạnh vương trên vai áo, một cái bóng đổ sai dưới chân, hay ánh mắt đen sâu như đã bỏ quên hồn vía ngoài bến nước.\nỞ cái xứ này, người ta sợ nhất không phải tiếng chó tru khuya, mà là lúc Canh Ba vừa điểm. Khi sương từ mé sông bò vô chợ Định Yên, đèn dầu lần lượt sáng lên, người sống với thứ không còn sống bắt đầu lẫn lộn vô nhau. Có kẻ ban ngày còn cười nói thân quen, tới đêm lại mang một gương mặt khác, lạ lẫm mà lạnh ngắt.\nMỗi canh, tui chỉ biết nhìn cho thiệt kỹ, dò cho thiệt sâu, coi người trước mặt còn thuộc về cõi này hay đã bị thứ gì đó mượn xác, mượn tiếng nói mà trà trộn vô làng.\nNhưng mấy bữa rày, con mắt này cũng không còn chắc như trước nữa. Sương dày quá, lòng người cũng tối quá. Tui chỉ sợ một lần mình nhìn lầm, một lời mình nói ra… lại đẩy người vô tội xuống chỗ chết."
    },
    {
        id: "ong-hoi-dong",
        name: "Ông Hội Đồng",
        group: "dan-lang",
        groupLabel: "Dân làng",
        image: "/images/cards/ong-hoi-dong.jpg",
        functionText: "Có thể can thiệp khi dân làng đem một người ra xử, mở cho họ thêm một đường sống.",
        story: "Ở cái làng Định Yên này, muốn sống yên thì phải biết nghe lời người có vai vế. Mà nói thiệt, mấy chuyện lớn nhỏ trong làng, nếu tui không đứng ra phân xử, chắc thiên hạ đã rối như mớ chỉ trong chợ từ lâu rồi.\nTui không nói mình lúc nào cũng đúng. Người khôn ngoan đâu cần đúng hoài, chỉ cần biết đứng về phía nào cho phải lúc. Khi dân làng hoảng sợ, kẻ nào cũng la làng đòi treo cổ người này, đuổi giết người kia, tui chỉ cần phe phẩy cây quạt, nói vài câu chậm rãi, là cuộc bàn tính tự nhiên đi theo hướng có lợi hơn.\nCó lợi cho làng hay có lợi cho tui, cái đó còn tùy thời thế.\nĐến lúc có người bị đem ra xử giữa chợ, nếu tui thấy còn dùng được, tui sẽ ra tay cứu một phen. Nhưng mạng người ở xứ này vốn nửa do người tính, nửa do số trời. Tui chỉ có thể mở cho họ một đường sống, còn bước qua được hay không… thì phải coi vận mạng của họ dày hay mỏng.\nTrong cái chợ Canh Ba này, sự thật không quan trọng bằng người biết điều khiển nó. Mà hễ tui còn nói được, còn khiến người ta nghe được, thì dầu ma quỷ có trà trộn trong làng… kẻ sống sót sau cùng chưa chắc đã là người ngay thẳng nhứt."
    },
    {
        id: "thay-hot-thuoc-nam",
        name: "Thầy Hốt Thuốc Nam",
        group: "dan-lang",
        groupLabel: "Dân làng",
        image: "/images/cards/thay-hot-thuoc-nam.jpg",
        functionText: "Có hai thang thuốc: một thang giữ mạng người và một thang tiễn người về với đất.",
        story: "Cả đời tui quen với mùi rễ cây, lá thuốc, khói bếp và tiếng người rên rỉ trên bộ ván tre sau nhà. Ở cái xứ sông nước này, hễ ai trúng gió, sốt rét, bị thương hay đau yếu, người ta lại tìm tới tui.\nHồi trước, tui tin bệnh nào rồi cũng có thuốc trị. Chỉ cần coi mạch cho kỹ, hốt đúng thang, sắc đúng lửa, người còn hơi thở thì còn đường cứu.\nNhưng từ ngày chợ Định Yên nổi chuyện Canh Ba, có những thứ thuốc Nam cũng không đuổi nổi. Có người tui cứu sống trong đêm, sáng ra lại lạnh ngắt, mặt mày tái mét như bị ai rút hết sinh khí. Có kẻ đáng lẽ phải chết, vậy mà vẫn ngồi dậy cười khan giữa sương mù.\nTrong tay tui còn hai thang thuốc cuối cùng: một thang giữ mạng người, một thang tiễn người về với đất. Dùng thuốc nào, dùng cho ai, phải coi cho thiệt kỹ.\nBởi lỡ tay cứu nhầm thứ dữ… hay giết lầm người ngay, thì tội đó có xuống mồ tui cũng trả không hết."
    },
    {
        id: "ngoai-lanh-dan-chieu",
        name: "Ngoại Lành Đan Chiếu",
        group: "dan-lang",
        groupLabel: "Dân làng",
        image: "/images/cards/ngoai-lanh-dan-chieu.jpg",
        functionText: "Mỗi đêm có thể giữ một người thoát khỏi cái chết trong gang tấc. Người đã được giữ một lần thì lần sau không còn được níu lại.",
        story: "Hỏi tui từ đâu tới, thiệt tình tui cũng không còn nhớ rõ. Người trong làng chỉ biết có một bà già lặng lẽ ngồi bên khung chiếu, tay lần từng sợi lác, mắt nhìn ra mé chợ như đang đợi một chuyện gì đã hẹn từ lâu.\nCái chiếu tui đan không phải chỉ để nằm, để bán ngoài chợ. Mỗi đường lác đan vô nhau đều có lời khấn cũ, có chút hơi người, chút phước mỏng còn sót lại giữa xứ này. Tới lúc Canh Ba điểm, khi tai họa sắp chạm vô một mạng người, tui có thể trải ra một lớp chắn không hình không tiếng, giữ họ thoát khỏi cái chết trong gang tấc.\nNgười được cứu thường không hay biết gì. Họ chỉ tưởng mình còn sống là nhờ may mắn. Nhưng ở đời, đâu có cái may nào tự dưng mà tới.\nMỗi đêm, tui chỉ giữ được một người. Mà người đã được giữ một lần rồi, số phận của họ lần sau tui không còn níu lại được nữa. Cứ mỗi lần giành một mạng khỏi tay bóng tối, thân tui lại nhẹ đi một chút, mắt tui lại mờ thêm một chút.\nTui chỉ sợ tới một đêm nào đó, tấm chiếu cuối cùng đan xong… người nằm trên đó lại chính là tui."
    },
    {
        id: "ba-tam",
        name: "Bà Tám",
        group: "dan-lang",
        groupLabel: "Dân làng",
        image: "/images/cards/ba-tam.jpg",
        functionText: "Lá phiếu của Bà Tám có sức nặng hơn khi cả làng đem nhau ra phân xử.",
        story: "Đừng thấy tui hay cười rồi tưởng tui hiền khô nghen bây. Ở cái chợ Định Yên này, chuyện lớn chuyện nhỏ gì mà lọt qua lỗ tai tui được.\nTui ngồi đó têm trầu, phe phẩy cái quạt, miệng thì nói chuyện trên trời dưới đất, vậy chớ mắt tui ngó hết, tai tui nghe hết. Đứa nào mới nửa đêm lén ra mé sông, đứa nào nói một đường làm một nẻo, đứa nào cười mà cái bụng đầy dao kéo, tui biết chớ hông phải hông.\nTui thương dân làng thiệt, nhưng đừng có qua mặt tui. Tui mà thấy bây gian gian, tui chửi cho tỉnh hồn liền. Ma quỷ ngoài chợ còn chưa chắc đáng sợ bằng cái miệng người sống biết nói dối đâu.\nTới lúc cả làng đem nhau ra phân xử, lá phiếu của tui không nhẹ như người ta. Tui nói một câu, thiên hạ phải nghe. Tui chỉ tay về phía nào, coi chừng số phận người đó cũng nghiêng theo phía đó.\nBởi vậy, đừng tưởng tui nhiều chuyện cho vui. Tui nói dai thiệt, nói dữ thiệt… nhưng câu nào tui nói ra cũng có cái lý của nó hết đó bây."
    },
    {
        id: "ba-tu-nhang",
        name: "Bà Tư Nhang",
        group: "dan-lang",
        groupLabel: "Dân làng",
        image: "/images/cards/ba-tu-nhang.jpg",
        functionText: "Nếu bị hại chết oan, người gây ra cái chết cho Bà Tư Nhang sẽ khó yên thân ở canh sau.",
        story: "Tui sống bằng nghề se nhang, phơi nhang, bán nhang, rồi lo luôn chuyện hương khói cho mấy nhà có tang trong làng Định Yên.\nSáng ra, người ta nghe tiếng chợ, còn tui nghe tiếng que tre lăn trên nia, mùi bột nhang, mùi trầm, mùi khói ám vô áo tới tối mịt cũng chưa bay hết. Bàn tay tui quen vuốt từng cây nhang cho thẳng, bó từng bó cho đều, để khi nhà ai có người nằm xuống, còn có chút khói đưa đường cho họ qua bên kia khỏi lạnh lẽo.\nTui không nói nhiều. Làm cái nghề này lâu rồi, tui biết có những chuyện người sống không nên hỏi tới cùng. Có bữa tui đang ngồi se nhang, tự nhiên khói quẩn ngược vô nhà, cay xè con mắt. Tui biết trong làng sắp có chuyện chẳng lành.\nNgười ta sợ tui cũng phải. Có khi tui đem nhang tới trước cửa một nhà, người trong nhà còn đang cười nói, vậy mà qua bữa sau đã có tiếng khóc vang lên. Họ nói tui xui, nói thấy bóng tui là thấy điềm chết.\nTui nghe rồi cũng thôi.\nTui đâu có đem cái chết tới. Tui chỉ là người làm ra cây nhang… và ngửi thấy mùi hương lạnh của người sắp phải đi trước thiên hạ mà thôi.\nMà nếu có kẻ nào khiến tui phải chết oan, thì đừng tưởng khói nhang tắt là xong. Hương còn vương, tro còn nóng, người đó qua canh sau cũng khó mà yên thân."
    },
    {
        id: "kep-hat",
        name: "Kép Hát",
        group: "dan-lang",
        groupLabel: "Dân làng",
        image: "/images/cards/kep-hat.jpg",
        functionText: "Có thể kết giao với một người, buộc hai số phận lại bằng một câu hát. Nếu một trong hai rời khỏi cuộc chơi, người còn lại biết phe thật của kẻ kia.",
        story: "Đời tui theo gánh hát trôi từ bến sông này qua bến chợ nọ, quen tiếng đờn kìm, tiếng song lang, quen ánh đèn dầu hắt lên mấy gương mặt vừa cười vừa khóc dưới sân đình.\nTui hát không lớn tiếng, cũng không cần nói nhiều. Chỉ cần nghiêng vành nón, đưa mắt một cái, cất giọng ngọt như nước dừa xiêm, là người ta tự dưng lặng xuống mà nghe.\n“Hò ơ…\nCanh ba gió thổi đôi bờ… \nĐịnh Yên chợ chiếu lên đèn mờ sương. \nTiếng rao lẫn giữa đêm trường…\nBóng ai qua lại…tỏ tường khó phân\nTui hát chuyện xưa tích cũ, hát người thương kẻ phụ, hát oan hồn chưa kịp qua sông. Nhưng từ ngày gánh hát ghé chợ Định Yên, lời ca của tui nghe kỳ lắm. Có câu tui không nhớ mình từng học, vậy mà miệng vẫn ngân ra. Có đoạn vừa hát đêm nay, sáng mai trong làng đã ứng nghiệm.\n“Hò ơ…\n Đèn khuya leo lét bên sông,\n Người cười trước mặt, trong lòng biết ai…”\nTrong canh chợ mù sương đó, tui có thể kết giao với một người, buộc hai số phận lại bằng một câu hát. Nếu một trong hai phải rời khỏi cuộc chơi, người còn lại sẽ biết được phe thật của kẻ kia.\nNgười ta nói giọng hát của tui mềm quá, ngọt quá, dễ khiến người nghe xiêu lòng. Nhưng ở chợ Canh Ba này, lời ca càng ngọt thì điềm báo càng sâu.\n“Hò ơ…\n Ai nghe thì nhớ cho tường,\n Có khi câu hát mở đường âm..ty”"
    },
    {
        id: "lu-khach",
        name: "Lữ Khách",
        group: "dan-lang",
        groupLabel: "Dân làng",
        image: "/images/cards/lu-khach.jpg",
        functionText: "Không có phép tự cứu, nhưng có khả năng ghi nhớ, quan sát và suy luận để chọn tin ai trước khi quá muộn.",
        story: "Tui từ Sài Gòn xuống, cứ ngỡ chỉ ghé qua Định Yên đôi bữa rồi đi. Đêm đầu tới bến, trời tối om, chỉ có tiếng nước vỗ mạn ghe với mấy ngọn đèn dầu leo lét ngoài chợ. Từ lúc đó, tui đã biết cái làng này không yên như vẻ bề ngoài của nó.\nTui không phải người trong làng, cũng không quen xen vô chuyện thiên hạ. Tui chỉ ngồi yên ở quán nước, nghe người ta nói, nhìn người ta cười, rồi lặng lẽ ghi từng chuyện vô cuốn sổ tay cũ mang theo bên mình. Ở nơi này, có những bí mật không nằm trong lời nói, mà nằm ở ánh mắt tránh né, ở câu chuyện bị bỏ lửng, ở cái im lặng kéo dài quá một nhịp.\nCàng ở lâu, tui càng biết nhiều điều mà một người ngoài không nên biết. Chuyện người chết không được nhắc tên. Chuyện những bóng người hiện ra giữa sương khuya. Chuyện dân làng nhìn nhau mà không dám nói thiệt lòng.\nTui không có phép gì để tự cứu mình. Trong chợ Canh Ba này, tui chỉ còn biết mở mắt cho kỹ, nghe cho rõ, suy cho thấu… rồi chọn tin vào ai trước khi quá muộn.\nMà lạ một điều… càng muốn rời đi, tui lại càng không bước nổi ra khỏi cái làng này. Không biết là Định Yên đang giữ chân tui… hay chính lòng tui cũng đã vướng lại nơi đây từ lúc nào rồi."
    },
    {
        id: "sau-ruou",
        name: "Sâu Rượu",
        group: "dan-lang",
        groupLabel: "Dân làng",
        image: "/images/cards/sau-ruou.jpg",
        functionText: "Khi men rượu trỗi dậy, có thể trở thành mối nguy không kiểm soát, khiến cả làng phải dè chừng.",
        story: "Người ta kêu tui là Sâu Rượu… chớ tên thiệt, lâu quá rồi, chắc tui cũng quên mất tiêu.\nBan ngày tui lêu bêu ngoài chợ, ôm cái chai, miệng ngậm điếu thuốc, ai nói gì thì cười hề hề cho qua. Người ta thấy tui say suốt, nói chuyện cà lăm cà lất, câu được câu mất, nên cũng chẳng ai buồn để ý. Mà thôi… vậy cũng khỏe.\nRượu vô rồi, đầu óc tui cứ quay mòng mòng. Có bữa đang ngồi ở mé sạp, chớp mắt một cái đã thấy mình nằm dài ngoài sân đình, người bê bết bùn đất, tay chân run bần bật… còn trong làng thì mới có thêm một cái xác.\nTui hổng nhớ. Thiệt tình hổng nhớ chút nào.\nChỉ biết mỗi lần men lên tới óc, trong người tui như có cái gì khác trỗi dậy. Nó nóng, nó dữ, nó thôi thúc… như muốn xé một ai đó ra cho hả.\nBởi vậy, người ta sợ ma quỷ ngoài chợ một… tui sợ chính mình mười.\nLỡ tới lúc tui say quá rồi… thì kẻ đáng sợ nhứt ở Định Yên này, chưa chắc là ma đâu."
    },
    {
        id: "su-thay",
        name: "Sư Thầy",
        group: "dan-lang",
        groupLabel: "Dân làng",
        image: "/images/cards/su-thay.jpg",
        functionText: "Có thể nhận tai họa thay một lần và níu kẻ gây ác lại, không cho tiếp tục hại người trong canh kế.",
        story: "A Di Đà Phật… cõi đời này vốn là bể khổ, người sống hay kẻ khuất mặt rồi cũng chỉ vì một chữ nghiệp mà vướng víu nhau.\nThầy về Định Yên nhằm mùa nước nổi. Con nước ngoài sông còn đục, mà lòng người trong làng đã chẳng còn trong. Đêm xuống, thầy chỉ lần chuỗi hạt, tụng mấy câu kinh cũ, mong cho kẻ còn sống được an lòng, người đã khuất cũng bớt phần oán hận.\nThầy không trách ai, cũng không vội nghi ai. Ma quỷ đáng sợ, nhưng lòng người mê muội, sân si, sợ hãi rồi hại lẫn nhau cũng là một thứ nghiệp nặng. Bởi vậy, trước khi kết tội một người, phải nhìn cho kỹ, nghe cho tường, chớ để một lời hồ đồ mà tạo thêm oan trái.\nNếu có tai họa tìm tới, thân này xin nhận trước một lần. Coi như lấy chút phước mỏng còn lại mà ngăn điều dữ cho dân làng. Kẻ gây ác, dù là người hay ma, rồi cũng sẽ bị tiếng kinh níu lại, không thể tiếp tục hại người trong canh kế.\nA Di Đà Phật… thầy chỉ mong tới khi chợ tan, người trong làng còn giữ được chút lòng lành, để không ai phải chết oan giữa đêm Canh Ba nữa."
    },
    {
        id: "thay-do",
        name: "Thầy Đồ",
        group: "dan-lang",
        groupLabel: "Dân làng",
        image: "/images/cards/thay-do.jpg",
        functionText: "Giữ nhịp cuộc chơi, điều phối lượt nói, nhắc thời điểm đêm xuống và dẫn dân làng tự cân nhắc người bị nghi.",
        story: "Tôi là thầy dạy chữ ở làng Định Yên này. Quanh năm chỉ quen với bút lông, nghiên mực, mấy xấp giấy cũ ngả màu, với tiếng học trò ê a dưới mái nhà tranh mỗi buổi sớm.\nDân trong làng có chuyện chi khó nghĩ cũng hay ghé qua hỏi tôi. Người thì nhờ viết đôi câu đối, kẻ thì nhờ đọc giùm tờ giấy, có người chẳng cần chữ nghĩa chi nhiều, chỉ muốn nghe một lời khuyên sao cho phải đạo làm người.\nTôi đọc sách thánh hiền cũng đã nhiều năm, nên trước giờ vẫn tin chuyện đời, dầu rối ren tới đâu, cũng có căn nguyên của nó. Chỉ cần bình tâm mà xét, nhìn cho kỹ, nghe cho thấu, thì ít nhiều cũng lần ra được đầu mối.\nNhưng từ bữa chợ Canh Ba nổi chuyện, mọi thứ trong căn nhà nhỏ của tôi bắt đầu hóa lạ.\nCó đêm tôi chấm bút xuống giấy, tay còn chưa kịp nghĩ, vậy mà mực đã tự chảy thành câu. Có chuyện tôi chỉ vừa lỡ miệng nói ra, ít bữa sau đã xảy đến y như lời. Có khi đang ngồi một mình bên ngọn đèn dầu, tôi nghe ngoài sân có tiếng ai đọc tên người chết, nhỏ thôi, mà lạnh tới tận sống lưng.\nTôi không dám nhận mình biết trước tương lai. Người có học càng không nên nói bừa điều mình chưa hiểu. Tôi chỉ sợ rằng chuyện trong làng Định Yên này, từ lâu đã được viết sẵn đâu đó rồi.\nCòn tôi… chẳng qua là kẻ vô tình đọc được vài dòng trước khi tai họa kịp xảy ra mà thôi.\nBởi vậy, trong đêm nay, tôi sẽ là người đứng ra giữ nhịp cho bà con trong chợ. Khi nào tới lượt nói, tôi sẽ gọi. Khi nào đêm xuống, tôi sẽ nhắc. Khi nào phải chọn một người để nghi, tôi sẽ để bà con tự cân nhắc lấy.\nNhưng nhớ nghen…\nỞ chợ Canh Ba này, lời nói có thể cứu người, mà cũng có thể đưa người ta xuống tận đáy sông. Ai nói thiệt, ai nói gian, ai còn sống, ai đã khuất… thì bà con phải tự mở mắt mà nhìn cho rõ."
    },
    {
        id: "co-ut-cheo-xuong",
        name: "Cô út chèo xuồng",
        group: "dan-lang",
        groupLabel: "Dân làng",
        image: "/images/cards/co-ut-cheo-xuong.jpg",
        functionText: "Ghi nhớ những người từng qua sông, quan sát sắc mặt và hành vi để giúp dân làng lần ra điều bất thường.",
        story: "Khúc sông sau làng Định Yên, hễ trời vừa sụp tối là sương kéo trắng mặt nước. Ban ngày nhìn nó hiền khô, lục bình trôi lững lờ, chim kêu trên mấy bụi dừa nước nghe cũng vui tai. Vậy mà tới đêm, ngay cả dân chài lâu năm cũng ít ai dám chèo ngang.\nCòn tui thì vẫn chèo.\nCó người cần qua sông, tui lại lặng lẽ chống xuồng ra bến. Người ta hỏi tui có sợ không, tui chỉ cười rồi nói thiệt: “Sợ chớ sao hổng sợ. Nhưng bỏ người ta đứng một mình ngoài bến giữa đêm hôm vậy, tội lắm.”\nTui vốn hổng phải người nói nhiều. Trên xuồng, tui thường chỉ cúi đầu chèo, để mái dầm khua nhẹ xuống nước. Khách ngồi phía sau có người im vì lạnh, có người im vì sợ, có người chắc cũng đang giấu chuyện gì trong lòng. Tui hổng hỏi. Ai lên xuồng của tui, ít nhiều gì cũng có điều khó nói.\nCó bữa, một người khách hỏi tui rằng dưới nước có thứ gì làm tui sợ không.\nTui ngừng chèo một chút, nhìn xuống mặt sông đen thui. Rồi tui đáp nhỏ nhẹ:\n“Dưới nước có gì, tui cũng hổng dám chắc. Nhưng ở đời, có khi thứ làm mình sợ nhất lại là lòng người đó nghen.”\nTừ đó, người khách ấy im luôn cho tới lúc cập bến.\nTui không dám nói mình biết hết chuyện trong làng. Tui chỉ nhớ thôi. Nhớ ai từng qua sông mà mắt cứ tránh né. Nhớ ai ngồi trên xuồng mà tay lạnh ngắt. Nhớ có người hôm trước còn cười nói, hôm sau đã nghe bà con trong chợ nhắc tên bằng giọng buồn hiu.\nTui hổng có phép, cũng hổng giỏi suy tính hơn ai. Tui chỉ quen nhìn con nước, nghe tiếng gió, coi sắc mặt người ngồi sau lưng mình. Có khi mấy điều nhỏ nhỏ đó lại nói thiệt hơn lời miệng.\nỞ chợ Canh Ba này, ai muốn qua sông thì cứ gọi tui. Tui sẽ đưa đi, chậm rãi thôi, miễn là còn thấy ngọn đèn dầu le lói bên kia bến.\nNhưng lên xuồng rồi thì nhớ ngồi cho yên nghen. Đừng thò tay xuống nước, cũng đừng ngoái đầu nhìn lại hoài. Có những chuyện đã bỏ lại sau lưng thì cứ để nó trôi theo con nước.\nCòn qua được bờ bên kia hay không, nhiều khi hổng phải do người chèo xuồng như tui, mà do lòng người có đủ ngay thẳng để đi tiếp hay không thôi.\n\n\n\n\n\n\nPhe Ma"
    },
    {
        id: "ma-da",
        name: "Ma Da",
        group: "ma",
        groupLabel: "Ma",
        image: "/images/cards/ma-da.jpg",
        functionText: "Dùng tiếng gọi thân quen để dụ người ra mé sông và kéo họ thế mạng.",
        story: "Người già ở Định Yên kể rằng, dưới khúc sông sau chợ có một cái bóng nằm đó đã lâu. Lâu tới nỗi không ai còn nhớ nó chết năm nào, chỉ nhớ bữa đó nước lớn, trời đen đặc, con nước xoáy dưới chân cầu như cái miệng há ra, nuốt mất một người cùng tiếng kêu cứu cuối cùng.\nTừ đêm ấy, dưới đáy sông có thêm một linh hồn không chịu tan.\nBà con gọi nó là Ma Da.\nBan ngày, con sông sau chợ vẫn hiền khô như bao dòng nước miền Tây khác. Lục bình trôi lờ đờ, ghe xuồng khua mái chèo lách cách, mấy bà đi chợ gọi nhau í ới từ mé bến qua bên kia sông. Nhưng hễ Canh Ba vừa điểm, khúc sông ấy bỗng lặng xuống. Nước không còn chảy nghe rì rầm nữa, sương từ dưới mặt sông bò lên trắng bờ, còn đèn dầu ngoài chợ thì chập chờn như có ai đứng sau lưng thổi nhẹ.\nNgười ta nói, đó là lúc Ma Da tỉnh dậy.\nNó ít khi hiện nguyên hình. Có người chỉ thấy một bàn tay trắng bệch trồi lên rồi mất hút dưới làn nước đen. Có người thấy một gương mặt úp ngược dưới sông, mắt mở thao láo nhìn lên mặt bến. Cũng có người kể, nó mang hình đứa nhỏ tóc ướt rũ rượi, đứng nép dưới chân cầu mà khóc thút thít, tiếng khóc mỏng như sương, nghe thương tới thắt ruột.\nNhưng thứ đáng sợ nhất của Ma Da không phải là hình dạng.\nMà là tiếng gọi.\nCó khi nó gọi bằng giọng má gọi con về ăn cơm. Có khi là tiếng chồng gọi vợ ngoài mé nước. Có khi là tiếng đứa nhỏ kêu cứu, nghe hụt hơi như sắp chìm tới nơi. Tiếng ấy giống thiệt đến mức người nghe không kịp nghĩ ngợi, chỉ thấy tim mình mềm xuống, chân mình tự bước ra bến lúc nào không hay.\nMà hễ đã trả lời một tiếng, coi như bị nó nhớ mặt.\nMặt sông khi đó đổi khác liền. Nước đang yên bỗng lạnh ngắt như nước liệm xác. Rong rêu dưới đáy quấn lấy cổ chân, càng vùng càng siết chặt. Sau lưng người bị kéo thường vang lên một tiếng cười nhỏ, ướt át, nghe như có ai vừa ngậm nước vừa cười sát bên tai.\nSáng ra, nếu tìm được xác, bà con chỉ biết nói là tai nạn. Người thì bảo trượt chân, kẻ nói bị nước cuốn, có người lại cho là say rượu té sông. Nhưng mấy người sống lâu ở Định Yên đều hiểu: không phải con nước nào cũng vô tình, không phải cái chết đuối nào cũng do xui rủi.\nVì Ma Da không kéo người chỉ để giết.\nNó kéo để thế mạng.\nHồn chết dưới nước bị giữ lại nơi đáy sông, lạnh lẽo, đói khát, không được đi đầu thai. Muốn thoát, nó phải tìm một người khác chìm thay mình. Bởi vậy, sau mỗi cái chết, khúc sông ấy lại im lặng vài đêm, như có kẻ vừa được nghỉ ngơi. Rồi tới một bữa Canh Ba khác, trong màn sương trắng sau chợ, lại vang lên một tiếng gọi mới.\nNgười Định Yên dặn nhau: đêm xuống đừng đi một mình ra bến, đừng cúi nhìn mặt nước quá lâu, đừng thò tay chân xuống sông khi nước lặng bất thường. Nhất là khi nghe ai đó gọi tên mình từ dưới mé sông, dầu giọng ấy có thân quen cỡ nào, cũng đừng trả lời.\nBởi có khi người mình thương đã ngủ yên trong nhà.\nCòn thứ đang gọi ngoài bến…\nlà Ma Da đang chờ mình bước xuống."
    },
    {
        id: "ma-lon",
        name: "Ma Lon",
        group: "ma",
        groupLabel: "Ma",
        image: "/images/cards/ma-lon.jpg",
        functionText: "Bám theo người đã gọi hoặc trêu chọc nó, phá rối trước khi bò ra khỏi cái lon rỗng.",
        story: "Tiểu quỷ nhảy múa trong lon rỗng\nHồi đó ở Định Yên, cứ chiều xuống là đám con nít trong xóm lại tụm năm tụm ba sau chợ. Đứa thì lượm lon sữa bò cũ, đứa kiếm cây tre nhỏ, đứa bày trò gõ cộp cộp rồi cười ré lên giữa bãi đất ẩm sau mấy sạp hàng đã dọn. Người lớn đi ngang thấy vậy liền la: “Tối rồi, đừng có giỡn với lon rỗng, coi chừng rước thứ không sạch vô nhà.”\nMà con nít thì nào có sợ.\nBữa đó, tụi nhỏ kiếm được một cái lon cũ nằm lăn lóc dưới gốc chuối sau chợ. Cái lon móp méo, miệng đen ngòm, bên trong còn dính mùi đất ẩm với nhang tàn. Một đứa lấy cây gõ vô thành lon, vừa gõ vừa hát mấy câu chọc ma. Cả đám cười rần rần, rồi thay phiên nhau đá cái lon chạy vòng quanh bãi đất.\nBan đầu, cái lon chỉ kêu như lon thường.\nCộp...Cộp…Cộp.\nNhưng càng chơi lâu, tiếng lon càng lạ. Nó không còn vang khô như kim loại nữa, mà nghe lộp bộp, nặng trịch, giống như bên trong có bàn tay nhỏ đang gõ ngược ra ngoài. Tới lúc trời sụp tối, đám nhóc định bỏ về thì cái lon tự lăn thêm một vòng, chậm rãi, rồi dừng ngay trước chân đứa nhỏ vừa cười lớn nhất.\nTừ trong lon, có tiếng khúc khích. Nhỏ xíu thôi. Như tiếng con nít đang nín cười trong bóng tối.\nTụi nhỏ đứng chết trân. Gió sau chợ bỗng lạnh hẳn, mấy ngọn đèn dầu ngoài sạp cá chớp tắt liên hồi. Đứa lớn nhất lấy chân đá mạnh cái lon vô bụi rậm rồi kéo cả đám chạy về. Nhưng đêm đó, khi nhà cửa ở Định Yên đã cài then, khi tiếng người ngoài chợ thưa dần, cái lon ấy lại bắt đầu lăn.\nCộp… cộp… cộp…\nQua bãi đất sau chợ.\nQua mé hàng cau.\nQua con hẻm nhỏ đầy mùi bùn non.\nRồi dừng trước hiên nhà đứa nhỏ đã đá nó đi.\nNgười ta nói Ma Lon không có hình dạng rõ ràng. Nó có thể là vong hồn trẻ nhỏ chết yểu, cũng có thể là thứ tiểu quỷ thích trú trong những vật rỗng ruột, bị bỏ quên ở nơi tối tăm. Nó không bước vào nhà bằng cửa, không gõ cửa xin vô. Nó chỉ cần một cái lon rỗng, một tiếng gọi bỡn cợt, một tràng cười vô ý lúc trời vừa chạng vạng.\nRồi tới Canh Ba, nó tự biết đường tìm về.\nAi bị Ma Lon theo, ban đầu chỉ nghe tiếng lon lăn dưới gầm giường. Đang ngủ cũng giật mình vì tiếng cộp cộp sát bên tai. Cúi xuống nhìn thì cái lon nằm im, miệng quay thẳng về phía mình, đen thui như không có đáy. Có người đem quăng xuống sông, sáng ra nó lại nằm trước cửa, dính bùn lạnh. Có người lấy đá đập bẹp, tới khuya vẫn nghe tiếng kim loại méo mó cạ trên nền gạch, bò từng chút từ sau bếp lên nhà trên.\nMa Lon không giết người liền. Nó phá trước.\nNó làm con nít sốt mê man, miệng lẩm bẩm: “Chơi nữa hông?” Nó làm người lớn mất ngủ, đêm nào cũng nghe tiếng lon lăn vòng vòng quanh vách. Nó làm chó trong sân cụp đuôi, không dám sủa. Nó làm đèn dầu tự tắt, làm tro nhang rơi thành vòng tròn quanh miệng lon, làm trong nhà lúc nào cũng lạnh như có hơi đất nghĩa địa bám vô.\nĐáng sợ nhất là khi tiếng lon ngừng hẳn. Vì bà con Định Yên tin rằng, lúc cái lon còn kêu, nghĩa là Ma Lon vẫn còn ở trong đó. Nhưng nếu cái lon nằm im quá lâu, lạnh ngắt quá lâu, miệng lon quay về phía người ngủ mà không động đậy nữa, thì có khi thứ bên trong đã bò ra ngoài rồi.\nTừ đó, nó không cần cái lon nữa. Nó chỉ cần người từng gọi nó nhớ tới nó.\nBởi vậy, ở Định Yên, người lớn hay dặn con cháu: chiều tối đừng lượm lon rỗng sau chợ, đừng gõ lon ở mấy bãi đất hoang, đừng cười giỡn gần mộ cũ, cũng đừng đem lon cũ vô nhà rồi bỏ quên trong góc tối.\nVì có những thứ ma không cần ai mời đàng hoàng. Chỉ cần một đám nhóc chơi dại. Một cái lon rỗng. Và một đêm Canh Ba đủ vắng."
    },
    {
        id: "ma-xo",
        name: "Ma Xó",
        group: "ma",
        groupLabel: "Ma",
        image: "/images/cards/ma-xo.jpg",
        functionText: "Canh giữ bí mật trong nhà, theo dõi người phạm vào chỗ nó giữ và bám theo họ trong bóng tối.",
        story: "Ở Định Yên, người ta sợ ma hiện giữa đường một, nhưng sợ thứ ma nằm trong nhà tới mười. Vì ma ngoài đường còn có thể tránh, chớ thứ đã ở sẵn trong xó vách, dưới gầm phản, sau bàn thờ cũ hay ngay góc tối cuối nhà thì có muốn tránh cũng không biết tránh đường nào.\nBà con gọi nó là Ma Xó.\nHồi xưa, người già kể rằng có những nhà nghèo tới mấy cũng không dám bỏ trống góc thờ nhỏ nơi cuối vách. Chỗ đó không thờ ông bà, cũng không đặt chung với thần tài, thổ địa. Nó chỉ có một chén nước lạnh, vài chân nhang cũ, một miếng bánh trái khô queo, lâu lâu thêm chén cơm nguội để trong bóng tối. Ai hỏi thì chủ nhà chỉ cười, nói để “giữ nhà”.\nNhưng người trong xóm hiểu.\nCái đang giữ nhà đó không phải người sống.\nMa Xó vốn là vong hồn được gọi về trú trong nhà, ở những chỗ khuất mắt, ít người dòm tới. Nó không cần cửa lớn, không cần giường chiếu, không cần tiếng người chuyện trò. Nó chỉ cần một góc tối đủ sâu, một chút khói nhang đủ lạnh, và một chủ nhà chịu nhớ tới nó mỗi ngày.\nNgười ta nói, nhà nào nuôi Ma Xó thì của cải khó mất. Kẻ lạ bước vô sân, nó biết. Trộm thò tay qua vách, nó thấy. Có người kể, nửa đêm đang tính lẻn vô nhà người ta thì tự dưng nghe tiếng ai thở sau gáy, quay lại không thấy ai, nhưng trên vách đất có một cái bóng đen ngồi chồm hổm, đầu ngoẹo qua một bên mà nhìn. Sáng hôm sau, người đó phát sốt, miệng cứ lẩm bẩm: “Nó ngồi trong xó… nó ngó tui…”\nNhưng Ma Xó không chỉ giữ của. Nó giữ luôn bí mật của căn nhà.\nCái gì chủ nhà giấu, nó biết. Ai trong nhà oán ai, nó nghe. Đêm nào có người khóc thầm bên bếp, nó nằm trong góc tối mà nghe hết. Lâu ngày, nó quen hơi người sống, quen mùi cơm nguội, mùi nhang tàn, mùi buồn bực bám trên vách lá. Rồi nó không còn chịu làm cái bóng giữ nhà nữa.\nNó bắt đầu đòi. Ban đầu chỉ là mấy chuyện nhỏ. Chén nước đặt trong xó sáng ra vơi đi. Bánh trái để cúng mất một góc. Tro nhang rơi thành vòng tròn ngay dưới chân bàn thờ. Con chó trong nhà đang ngủ bỗng cụp đuôi chui xuống gầm giường, mắt nhìn chằm chằm vô góc vách mà rên ư ử.\nTới Canh Ba, Ma Xó mới thật sự động.\nKhi chợ Định Yên tắt bớt đèn, tiếng ghe ngoài sông thưa dần, sương bò qua mái lá rồi len vô từng khe cửa, trong nhà sẽ nghe tiếng lụp cụp rất khẽ. Không phải chuột. Không phải gió. Mà giống như có ai đang bò bằng đầu ngón tay trên vách.\nLụp xụp. Lụp cụp. Rồi im.\nAi còn thức mà nhìn về phía góc nhà sẽ thấy bóng tối ở đó dày hơn chỗ khác. Đèn dầu rọi tới cũng không tan. Càng nhìn lâu, người ta càng thấy trong cái xó ấy như có một dáng người nhỏ thó đang ngồi bó gối, tóc xõa xuống mặt, lưng cong queo, im lìm như đã ngồi đó từ nhiều đời trước.\nMa Xó không thích bị nhìn thẳng. Nhưng nó lại thích nhìn người ta.\nCó nhà kể rằng, từ ngày trong xó có thứ lạ, đi đâu cũng có cảm giác bị dòm. Ăn cơm cũng bị dòm. Ngủ cũng bị dòm. Ngồi ngoài hiên vá áo cũng thấy sau lưng lạnh lạnh, như có cặp mắt đang ngó xuyên qua vách. Khách lạ tới nhà thì bát cơm trên mâm tự dưng nghiêng đi, chén nước động nhẹ, còn dưới gầm phản vang lên một tiếng cười khàn khàn, nhỏ tới mức tưởng mình nghe lầm.\nNgười ta nuôi Ma Xó để giữ nhà, nhưng không phải ai cũng giữ nổi nó.\nNếu chủ nhà tham quá, dùng nó để hại người, để trộm lộc, để giành của, thì Ma Xó sẽ càng lúc càng nặng vía. Nó không còn nằm yên trong góc nữa. Nó bò qua bếp. Nó leo lên bàn thờ. Nó ngồi trên xà nhà lúc cả nhà ngủ say. Có đêm, người trong nhà mở mắt ra thấy một cái bóng đen treo ngược trên vách, mặt quay xuống, miệng cười méo xệch như đang chờ ai gọi tên mình.\nĐáng sợ nhất là khi Ma Xó bị bỏ quên.\nKhông nhang khói, không cơm nước, không ai nhớ tới, nó sẽ đói. Mà ma đói trong nhà thì dữ hơn ma ngoài đồng. Nó làm trẻ nhỏ khóc đêm, làm người lớn sinh nghi kỵ, làm của cải trong nhà tự hao hụt. Nó khiến người ta nghe tiếng chân đi quanh giường lúc nửa đêm, nghe tiếng thì thầm trong góc bếp, nghe tiếng ai đó gọi tên mình từ phía sau bàn thờ cũ.\nDân Định Yên dặn nhau, vô nhà người lạ đừng dòm lâu vô mấy góc tối. Đừng cười cợt chỗ người ta đặt chén nước, chân nhang hay mâm cúng nhỏ. Cũng đừng tùy tiện lấy đồ trong nhà người khác, dù chỉ là cây kim, miếng vải hay đồng bạc lẻ để quên trên sạp.\nVì có khi chủ nhà chưa thấy. Nhưng Ma Xó đã thấy rồi.\nVà tới lúc phiên chợ Canh Ba mở ra, khi người sống lẫn người chết đi ngang qua nhau trong màn sương lạnh, Ma Xó sẽ rời khỏi góc nhà, lặng lẽ đi theo sau kẻ đã phạm vào chỗ nó canh giữ.\nKhông ai nghe tiếng bước chân của nó. Chỉ tới khi về nhà, cúi xuống nhìn cái bóng mình dưới đèn dầu, người ta mới thấy sau lưng mình có thêm một cái bóng nhỏ. Ngồi bó gối. Im ru. Và nhìn mình không chớp mắt."
    },
    {
        id: "ma-nu",
        name: "Ma Nữ",
        group: "ma",
        groupLabel: "Ma",
        image: "/images/cards/ma-nu.jpg",
        functionText: "Dùng dáng vẻ và tiếng gọi để dụ người đi theo về phía căn nhà cháy cũ.",
        story: "Bóng người con gái trở về từ đám cháy\nMùi khói ấy không giống khói bếp, cũng không giống mùi rơm rạ ai đốt ngoài đồng. Nó âm ỉ, lạnh tanh, len qua từng mái lá, từng sạp hàng đã đóng, rồi vương lại trên áo người đi khuya như tro của một đám cháy cũ chưa từng tắt. Hễ mùi khói đó xuất hiện, bà con trong chợ đều biết: cô gái nhà bá hộ lại trở về.\nHồi xưa, ở mé chợ Định Yên có căn nhà lớn của một ông bá hộ giàu có nhất vùng. Nhà cao, cửa rộng, sân lát gạch tàu, trước hiên lúc nào cũng treo lồng đèn đỏ. Ông bá hộ có một cô con gái đẹp nức tiếng. Người ta nói cô đẹp dịu dàng như bông súng mới nở lúc sớm mai, tóc dài đen mướt, da trắng, giọng nói nhỏ nhẹ, đi ngang qua chợ là mấy bà bán trầu, bán vải đều ngoái nhìn.\nCô quen từng lối đi trong chợ. Quen sạp trầu cau đầu bến, quen hàng vải có tấm lụa màu thiên thanh, quen quán chè nhỏ bên hông đình, quen cả tiếng mái chèo khua dưới sông mỗi chiều nước lớn. Đám con nít trong chợ thương cô lắm, vì lần nào đi ngang, cô cũng dúi cho tụi nó viên kẹo, cái bánh, rồi cười hiền như người chị trong nhà.\nVậy mà một đêm, lửa nổi lên.\nKhông ai biết lửa bắt đầu từ đâu. Chỉ nhớ đêm ấy vừa đúng mười một giờ, căn nhà bá hộ bỗng đỏ rực như có ai đổ dầu khắp vách. Lửa liếm qua rèm cửa, trườn lên mái ngói, nuốt từng cây cột gỗ. Tiếng người la hét vang khắp mé chợ. Tiếng cửa bị đập dồn dập. Tiếng vòng tay va vào song cửa nghe leng keng giữa tiếng gỗ cháy lách tách.\nCô gái bị kẹt lại bên trong.\nNgười ta nghe cô gọi cứu mấy tiếng, ban đầu còn rõ, sau yếu dần, yếu dần… rồi mất hẳn trong khói. Đến khi lửa tàn, căn nhà lớn chỉ còn nền gạch nứt, vài cây cột cháy đen và mùi tro ẩm bám dai dẳng qua nhiều mùa mưa nắng.\nTừ đó, linh hồn cô không siêu thoát.\nBà con gọi cô là Ma Nữ.\nCứ đúng mười một giờ đêm, cái giờ ngọn lửa bật lên năm ấy, cô lại quay về căn nhà cũ. Ban đầu chỉ là một làn khói mỏng trườn qua nền gạch cháy. Rồi đèn dầu ngoài chợ bắt đầu chập chờn, dù gió không thổi. Mấy con chó nằm dưới sạp bỗng rên ư ử, cụp đuôi chui vô góc tối. Sau đó, từ trong màn sương lạnh, một bóng áo trắng chậm rãi bước ra.\nCô không khóc.\nCũng không kêu cứu nữa.\nCô chỉ đi.\nĐi qua từng lối chợ mà lúc còn sống cô từng quen thuộc. Qua sạp trầu cau đã đóng, qua hàng vải phủ khăn, qua chỗ bán nhang đèn còn vương mùi trầm cũ. Tà áo trắng của cô lướt nhẹ trên mặt đất, chân không chạm nền, tóc dài rũ xuống gần hết lưng. Nếu nhìn kỹ, người ta sẽ thấy mép áo bị cháy xém, cổ tay lấm tấm vết bỏng, còn sau mỗi bước chân là một vệt tro mỏng tan ra trong sương.\nMa Nữ không hiện ra với ai cũng giống nhau.\nVới người đi ngang vội vã, cô chỉ là một bóng trắng thoáng qua cuối chợ. Với người yếu vía, cô hiện thành một cô gái đẹp, mặt buồn, mắt ướt, giọng nói dịu dàng như đã quen từ kiếp trước. Cô có thể hỏi đường về nhà, hỏi bây giờ là mấy giờ, hoặc nhờ người ta đưa cô đi ngang qua khu chợ vắng.\nCó khi cô đứng dưới mái hiên cũ, cúi đầu chải tóc bằng một chiếc lược cháy đen. Mỗi lần chiếc lược kéo qua mái tóc dài, tro rơi xuống lả tả như bụi than. Có người còn nghe cô hát khe khẽ một câu vọng cổ buồn, giọng ngọt mà lạnh, nghe càng lâu càng thấy lòng mình nặng xuống, mắt cay xè như khói tạt vào mặt.\nĐàn ông đi khuya thường bị cô gọi nhất.\n“Anh ơi…”\nChỉ hai tiếng thôi, nhẹ như gió lùa qua vách lá. Nhưng ai lỡ quay đầu lại thì khó mà dứt ra được. Người đó sẽ thấy cô đứng trong màn sương, áo trắng phất nhẹ, gương mặt đẹp tới nao lòng. Cô không níu tay, không kéo áo, chỉ nhìn rồi mỉm cười. Vậy mà chân người ta cứ tự bước theo, đi qua mấy sạp hàng vắng, đi qua nền chợ lạnh, rồi tiến dần về phía căn nhà cháy cũ.\nCàng tới gần, mùi khói càng nồng.\nĐất dưới chân càng nóng.\nRồi tiếng lửa bắt đầu nổi lên.\nLách tách.\nLách tách.\nNhư đêm hỏa hoạn năm xưa đang sống lại sau lưng.\nCó người may mắn tỉnh ra giữa đường thì thấy mình đứng trước nền nhà hoang, hai chân dính đầy tro, tay áo cháy xém dù xung quanh chẳng có một đốm lửa nào. Có người sau đêm đó phát sốt, miệng cứ gọi tên một cô gái chưa từng gặp. Cũng có người mất tích tới sáng mới được tìm thấy nằm ngất bên bến sông, tóc còn ám mùi khói, trong tay nắm chặt một mảnh vải trắng cháy đen một góc.\nNgười Định Yên tin rằng Ma Nữ không hẳn chỉ muốn hại người.\nCô chết oan, chết tức tưởi, chết lúc tuổi còn xuân, lòng còn nhiều điều chưa kịp nói. Bởi vậy cô cứ quay về, đi lại những nơi mình từng thương, tìm trong phiên chợ cũ một gương mặt còn nhớ tới mình. Nhưng người chết càng nặng lòng với dương gian thì hơi lạnh của họ càng dễ kéo người sống đi theo.\nNhất là vào Canh Ba.\nKhi chợ Định Yên mở phiên cho người chết, giữa màn sương từ mé sông bò lên trắng xóa, Ma Nữ thường xuất hiện rõ nhất. Cô đi lẫn trong đám bóng người lặng lẽ, tay cầm chiếc lược cháy, tà áo trắng thấp thoáng sau những ngọn đèn dầu leo lét. Cô dừng trước từng sạp hàng như đang tìm lại đời mình, rồi quay đầu nhìn về căn nhà cũ, nơi ngọn lửa năm xưa vẫn còn cháy đỏ trong đôi mắt.\nBà con dặn nhau, đêm khuya nghe tiếng con gái gọi ngoài chợ thì đừng trả lời. Thấy bóng áo trắng đi một mình giữa sương cũng đừng đi theo. Nhất là đúng mười một giờ, nếu tự dưng ngửi thấy mùi khói mà không thấy ai đốt lửa, thì phải cúi mặt đi cho lẹ, đừng ngoái đầu, đừng hỏi han, đừng thương hại.\nVì có khi đó không phải khói bếp. Cũng không phải sương đêm. Mà là dấu chân của Ma Nữ. Đang trở về từ một đám cháy chưa bao giờ tàn."
    },
    {
        id: "vong-nhi",
        name: "Vong Nhi",
        group: "ma",
        groupLabel: "Ma",
        image: "/images/cards/vong-nhi.jpg",
        functionText: "Giữ người được chọn lại bằng tiếng khóc và nỗi cô đơn, khiến họ khó rời khỏi Định Yên.",
        story: "Có những tiếng khóc thút thít nửa đêm. \nNó nhỏ xíu, đứt quãng, nghẹn lại như một đứa bé vừa tỉnh giấc mà không tìm thấy ai bên cạnh. Có khi tiếng khóc vọng ra từ cái võng cũ trong căn nhà bỏ trống. Có khi vang lên dưới gầm giường, bên bếp lửa đã tàn, hay ngoài mé sông nơi lục bình trôi lặng lẽ trong sương.\nNgười trong làng kể rằng, năm xưa có một đứa nhỏ chết khi còn chưa kịp hiểu hết chuyện đời. Nó còn quá bé để biết vì sao má không về kịp, vì sao đêm đó nước lại dâng cao, vì sao gọi hoài mà không có ai đáp lại.\nSáng hôm sau, người ta chỉ tìm thấy món đồ chơi cũ mắc trong đám lục bình.\nTừ đó, mỗi đêm khuya, trong làng thỉnh thoảng lại vang lên tiếng chân nhỏ chạy lúp xúp quanh nhà, rồi dừng lại rất khẽ bên cạnh người đang ngủ. Không ai thấy rõ mặt nó. Người ta chỉ nghe một tiếng cười con nít thật nhẹ, rồi một bàn tay nhỏ xíu, lạnh ngắt, lần tìm nắm lấy tay ai đó dưới tấm mền.\nNó không muốn hại người.\nCó lẽ nó chỉ sợ bị bỏ lại thêm một lần nữa.\nNhưng nỗi cô đơn của một đứa trẻ chết yểu cũng có thể trở thành thứ đáng sợ. Ai được nó chọn ban đầu sẽ thấy thương nhiều hơn sợ. Họ để riêng một viên kẹo, treo lại cái võng cũ, đặt một chén cơm nhỏ bên góc nhà, rồi dần dần quen với cảm giác trong nhà mình luôn có thêm một đứa trẻ vô hình chờ được dỗ dành.\nĐến khi họ muốn rời khỏi Định Yên, tiếng khóc ấy lại vang lên sau lưng.\nRất nhỏ thôi.\nNhưng đủ làm lòng người mềm xuống.\nCó người chèo ghe qua nửa khúc sông thì thấy trên lòng ghe hiện ra mấy dấu chân trẻ con ướt nước. Có người đi xa khỏi làng, đêm đầu tiên đã nghe tiếng cười khúc khích dưới gầm giường. Có người vừa thu xếp đồ đạc, vừa nghe một giọng non nớt gọi sau lưng:\n“Đừng bỏ con…”\nTừ đó, họ quay về.\nVì Vong Nhi không biết giữ người bằng lời nguyền hay oán độc. Nó giữ người bằng tiếng khóc, bằng bàn tay lạnh, bằng nỗi buồn quá nhỏ để bị trách mắng mà cũng quá sâu để người ta dứt ra.\nỞ chợ Canh Ba, người ta nói Vong Nhi không dữ, cũng chẳng hại ai. \nChỉ biết rằng, những kẻ mà nó chọn sẽ chẳng bao giờ rời khỏi đây được nữa, mãi mãi mắc kẹt trong cái làng Định Yên này."
    },
    {
        id: "than-trung",
        name: "Thần Trùng",
        group: "ma",
        groupLabel: "Ma",
        image: "/images/cards/than-trung.jpg",
        functionText: "Đi sau một cái chết đầu tiên và kéo thêm những cái chết kế tiếp như một lời mời lạnh lùng.",
        story: "Có những cái chết không khép lại bằng nắp quan tài. Có những đám tang, người chết vừa được đưa xuống đất, người sống đã nghe trong nhà mình có tiếng ai lật sổ.\nTừng trang.\nTừng trang.\nNhư thể dưới ánh đèn dầu còn đỏ, có một kẻ vô hình đang ngồi bên bàn thờ, chấm mực vào tên từng người còn thở.\nỞ Định Yên, hễ một nhà vừa chôn người thân mà khói nhang cứ quẩn mãi không bay, chó trong sân rúc đầu dưới gầm phản, còn ban đêm có tiếng dép đi vòng quanh giường, người già sẽ không nói đó là xui rủi.\nHọ chỉ hạ giọng bảo nhau: “Nhà đó bị trùng tang rồi.”\nThần Trùng không giống ma vất vưởng ngoài sông, cũng không như vong cô độc tìm người bầu bạn. Nó không đến vì đói, vì nhớ, hay vì oan ức. Nó đến theo luật của nó — lạnh lùng, rạch ròi, và tàn nhẫn như một bản án đã ghi sẵn dưới âm ty.\nMột người chết chưa đủ. Một tiếng khóc chưa vừa.\nMột cỗ quan tài chưa làm nó no lòng.\nHễ Thần Trùng đã bước qua ngạch cửa, cái chết đầu tiên chỉ là tiếng chuông mở màn. Sau đó, từng người trong nhà sẽ bắt đầu nghe tên mình bị gọi lúc nửa đêm. Có kẻ nghe tiếng người chết đứng ngoài sân kêu cửa. Có kẻ thấy bóng đen ngồi trên xà nhà, cúi đầu đếm từng mạng sống dưới mái nhà ấy. Có kẻ đang ngủ bỗng giật mình vì một giọng khàn đặc thì thầm sát tai: “Còn ai nữa không?”\nNgười ta sợ Thần Trùng không phải vì nó hiện hình ghê rợn.\nNgười ta sợ vì nó không bao giờ đi một mình.\nNó đi sau đám tang đầu tiên, rồi kéo theo đám thứ hai, đám thứ ba, cho tới khi căn nhà ấy chỉ còn mùi nhang cũ, khăn tang chưa khô, và những người sống sót nhìn nhau bằng ánh mắt vừa thương vừa sợ.\nBởi với Thần Trùng, cái chết không phải là kết thúc.\nCái chết chỉ là lời mời."
    },
    {
        id: "ma-doi",
        name: "Ma Đói",
        group: "ma",
        groupLabel: "Ma",
        image: "/images/cards/ma-doi-1.jpg",
        functionText: "Thắng khi còn 3 người sống và có bạn.",
        story: "Những linh hồn bị bỏ đói\nỞ Định Yên, người ta nói có những đêm chợ đã dọn hết rồi mà mùi cơm nguội vẫn còn bay quanh mấy sạp hàng vắng. Không phải mùi cơm mới nấu, cũng không phải mùi đồ cúng còn sót lại, mà là một thứ mùi chua lạnh, ngai ngái như bát cơm để lâu ngoài sương, trộn với khói nhang tàn và hơi đất ẩm.\nHễ mùi đó nổi lên lúc Canh Ba, người già trong làng liền biết: Ma Đói đang về.\nMa Đói, có nơi còn gọi là Ngạ Quỷ, Dạ Quỷ, là những linh hồn chết trong đói khát, bệnh tật, hoặc chết rồi mà không ai thờ cúng, không có một bát cơm, một nén nhang để nương nhờ. Chúng không được nhận vào nhà ai, cũng không có chỗ tựa trong cõi âm, cứ lang thang từ bờ sông, bãi đất hoang, tới những góc chợ còn vương mùi thức ăn thừa.\nNgười ta kể hình dạng Ma Đói rất thảm. Thân nó gầy nhom, da bọc xương, tóc rối phủ xuống cái mặt hốc hác. Hai mắt lồi ra, tối đen như đã nhìn quá lâu vào một cái nồi trống. Cái bụng thì phình lớn, nhưng cổ họng lại nhỏ xíu như cây kim, nên dầu có đói tới cháy ruột, nó cũng không nuốt được gì cho no.\nBởi vậy nó cứ đói hoài.\nĐói từ lúc chết.\nĐói qua từng mùa nước nổi.\nĐói tới mức nghe tiếng ai bẻ miếng bánh tráng ngoài chợ, nó cũng quay đầu lại.\nBan ngày, chợ Định Yên đông người, Ma Đói thường núp trong những chỗ khuất: sau sạp cá, dưới gầm bàn bán chè, bên cạnh thùng gạo cũ, hoặc chỗ người ta đổ cơm thừa cho chó. Nhưng hễ đêm xuống, đèn dầu ngoài chợ thưa dần, tiếng rao tắt mất, sương từ mé sông bò lên, nó mới lò dò đi ra.\nNó không đi nhanh.\nNó đi như người kiệt sức.\nTừng bước kéo lê trên nền đất ẩm, để lại phía sau mùi bùn, mùi tro lạnh và mùi đói khát lâu ngày. Có người bán hàng ngủ quên trong chợ từng kể, nửa đêm nghe tiếng ai húp cháo sau lưng. Quay lại thì nồi cháo vẫn còn nguyên, nhưng trên mặt cháo có một vệt lõm sâu như vừa có cái miệng vô hình cúi xuống liếm qua.\nMa Đói không chỉ ăn đồ ăn.\nNó ăn luôn hơi ấm của người sống.\nAi bị Ma Đói theo, ban đầu chỉ thấy thèm ăn bất thường. Vừa ăn xong đã đói, bụng cồn cào, cổ họng khô rát. Đến khuya thì tỉnh dậy đi tìm cơm nguội, bánh trái, đồ cúng, thậm chí bốc cả gạo sống bỏ vào miệng. Nhưng càng ăn, người đó càng xanh xao, mắt trũng xuống, tay chân lạnh ngắt, như có thứ gì bên trong đang ăn thay mình.\nBà con nói, Ma Đói khổ là vậy. Thấy cơm thì mừng, thấy đồ cúng thì mừng, nhưng đưa tới miệng lại hóa thành tro, thành lửa, thành khói đen nghẹn trong cổ. Cái đói của nó không phải cái đói một bữa, mà là cái đói của linh hồn bị bỏ quên quá lâu, không ai gọi tên, không ai cúng kiếng, không ai nhớ nó từng là người.\nỞ Định Yên, Ma Đói thường xuất hiện rõ nhất vào những đêm chợ có cúng cô hồn, hoặc khi nhà nào làm đám mà bày mâm ngoài sân rồi quên khấn mời đàng hoàng. Khi đó, người ta sẽ thấy chén cơm trên mâm tự dưng vơi đi một góc, cây nhang cháy cong xuống, trái chuối trên đĩa héo đen chỉ sau một đêm. Có khi, giữa lúc mọi người đang ăn uống, dưới gầm bàn lại vang lên tiếng nuốt khan.\nỰc.\nMột tiếng nhỏ thôi.\nNhưng nghe xong ai cũng thấy lạnh sống lưng.\nĐến Canh Ba, khi phiên chợ của người chết mở ra, Ma Đói lẫn vào đám bóng người đi chợ. Nó đứng trước sạp bánh, nhìn nồi chè, nhìn mâm xôi, nhìn con cá nướng còn bốc khói mà nước dãi chảy xuống cằm. Người sống nếu không để ý sẽ tưởng đó là một kẻ ăn xin gầy gò. Nhưng nếu nhìn kỹ, sẽ thấy chân nó không chạm đất, còn cái bóng dưới đèn dầu thì dài ngoằng, méo mó như một cái bụng rỗng đang há miệng.\nMa Đói không gọi người bằng tiếng khóc như Ma Da.\nNó gọi bằng cơn đói.\nNó khiến người ta thèm một món gì đó đến mất tỉnh táo. Thèm bát cháo nóng giữa đêm. Thèm miếng bánh còn cúng trên bàn. Thèm chén cơm nguội để trong bếp. Rồi khi người đó đưa tay bốc ăn, Ma Đói sẽ đứng sát sau lưng, há cái miệng khô khốc ra mà hít lấy hơi người sống.\nNgười Định Yên dặn nhau, đêm khuya đừng ăn đồ cúng bỏ ngoài sân, đừng nhặt bánh trái rơi ở chợ Canh Ba, cũng đừng cười cợt mấy mâm cô hồn đặt bên đường. Thấy một người gầy nhom đứng nhìn đồ ăn mà không chớp mắt thì phải tránh đi, đừng thương hại quá, cũng đừng mời về nhà ăn cơm.\nVì có những cái đói không thể cho no.\nCó những linh hồn càng được nhớ tới, càng bám chặt lấy người sống.\nVà trong phiên chợ Định Yên, nếu nghe sau lưng có tiếng nuốt khan giữa màn sương lạnh, thì đừng quay đầu lại.\nBiết đâu thứ đang đứng sau mình không xin một miếng ăn.\nMà đang chờ mình trở thành bữa cuối cùng của nó."
    },
    {
        id: "quy-nhap-trang",
        name: "Quỷ Nhập Tràng",
        group: "ma",
        groupLabel: "Ma",
        image: "/images/cards/quy-nhap-trang.jpg",
        functionText: "Mượn xác người chết để quay lại dương gian, bắt chước người sống và lừa người thân mất cảnh giác.",
        story: "Mượn xác nuôi hồn\nBởi người chết thì còn có thể khâm liệm, cúng kiếng, đưa ra đồng cho yên mồ yên mả. Còn thứ đã mượn xác người chết để quay về dương gian thì không còn là người nhà nữa. Nó chỉ đội lại gương mặt quen, mặc lại bộ đồ cũ, nằm lại trên chiếc phản cũ… để chờ lúc người sống mất cảnh giác mà bước tới gần.\nBà con gọi thứ đó là Quỷ Nhập Tràng.\nChuyện kể rằng, hồi xưa ở gần chợ Định Yên có một nhà làm đám tang lúc nửa đêm. Người mất là một ông già bệnh lâu ngày, thân thể gầy rộc, hơi thở tắt từ chập tối. Con cháu đã tắm rửa, thay áo, đặt ông nằm giữa nhà, hai ngọn đèn dầu để hai bên đầu, còn trước sân thì khói nhang bay lạnh ngắt.\nĐêm đó trời im lắm. Im tới mức nghe rõ tiếng nước ngoài sông vỗ nhẹ vô mạn xuồng.\nTới gần Canh Ba, khi người ngồi canh xác bắt đầu gục đầu ngủ, trong nhà bỗng có tiếng mèo kêu. Một con mèo mun từ đâu lẻn vô, mắt xanh lét, lông dựng ngược, đi một vòng quanh quan tài rồi bất thần phóng ngang qua cái xác.\nNgọn đèn dầu phụt tắt. Cả nhà lạnh xuống như có ai mở cửa âm ty.\nRồi cái xác động đậy.\nBan đầu chỉ là một ngón tay co lại. Sau đó tới bàn chân. Rồi cái đầu đang nằm ngay ngắn bỗng nghiêng qua một bên, chậm rãi, cứng đờ, như có ai từ bên trong đang tập làm quen với thân xác mới. Người nhà chưa kịp la thì ông già đã ngồi bật dậy, hai mắt mở trừng trừng, tròng mắt đục ngầu không còn nhìn giống người sống.\nÔng không thở. Nhưng ông cười.\nTừ đêm ấy, trong nhà bắt đầu có chuyện lạ. Người ta thấy “ông” đi qua đi lại lúc nửa đêm, dáng bước cứng ngắc, chân kéo lê trên nền gạch. Ban ngày thì ông nằm im, da lạnh tanh, không nói không rằng. Nhưng tới khuya, ông lại mở mắt, ngồi dậy, đòi ăn. Ăn rất nhiều, ăn không biết no, nhưng thức ăn đưa vào bao nhiêu cũng không tiêu, trong nhà lúc nào cũng phảng phất mùi thiu rữa, dù con cháu lau dọn tới mấy cũng không hết.\nQuỷ Nhập Tràng không sống như người sống. Nó chỉ bắt chước.\nNó bắt chước cách người chết từng nói chuyện, từng ho khan, từng gọi tên con cháu. Có khi nó ngồi ngoài hiên, lẩm bẩm mấy câu mà ông già lúc sinh thời hay nói. Có khi nó đưa tay vuốt tóc đứa cháu nhỏ, nhưng bàn tay lạnh tới mức đứa nhỏ khóc ré lên. Có khi nó nhìn mâm cơm, nhìn từng người trong nhà, rồi cười khục khục trong cổ họng, như đang nhớ coi người sống thường làm gì với cái thân xác này.\nNgười bị Quỷ Nhập Tràng mượn xác thường có nhiều dấu lạ. Thân thể lạnh nhưng không cứng hẳn, mắt mở mà không chớp, miệng nói được nhưng giọng khàn như vọng từ dưới đất sâu. Nó không ngủ, không mệt, không biết đau. Nếu bị thương, máu chảy ra không đỏ tươi mà vàng nhợt, nặng mùi tanh hôi. Nó sợ lửa, sợ nước, sợ gương, vì những thứ đó dễ làm lộ cái bóng thật đang núp trong thân xác người chết.\nĐáng sợ nhất là nó biết nhớ.\nNó nhớ đường về nhà.\nNhớ tên từng người thân.\nNhớ chỗ cất tiền, chỗ để đồ cúng, chỗ trẻ nhỏ hay ngủ.\nBởi vậy người trong nhà càng thương người chết bao nhiêu, càng dễ bị nó lừa bấy nhiêu. Nó chỉ cần gọi một tiếng “con à”, “má à”, “lại đây coi chút”… là đã có người mềm lòng bước tới. Nhưng khi tới gần, họ sẽ nghe mùi đất lạnh phả ra từ miệng nó, nghe tiếng xương kêu răng rắc dưới lớp da, và thấy trong đôi mắt đục kia không còn chút tình thân nào hết.\nỞ chợ Định Yên, Quỷ Nhập Tràng thường xuất hiện vào những đêm có đám ma gần mé chợ. Khi phiên chợ Canh Ba mở ra, nó có thể trà trộn giữa đám người sống và người chết, khoác lên mình hình dáng của một ông lão, một bà cụ, một người quen vừa mới mất. Nó đi chậm rãi qua mấy sạp hàng, tay chắp sau lưng, miệng mỉm cười, nhưng dưới chân lại không có hơi người, còn cái bóng dưới đèn dầu thì méo mó như một con vật đang bò.\nNgười già ở Định Yên dặn kỹ: nhà có tang thì phải canh xác cho nghiêm, đừng để mèo nhảy ngang, đừng để gió lùa tắt đèn, đừng gọi tên người chết quá nhiều lúc đêm khuya. Nếu cái xác bỗng động đậy, đừng mừng tưởng người thân sống lại. Nếu người chết mở mắt nhìn mình, đừng bước tới ôm. Và nếu nghe họ gọi tên mình bằng giọng quen thuộc, cũng đừng trả lời liền.\nVì có khi người thân mình đã đi rồi. Thứ còn nằm lại trên phản chỉ là cái xác. Còn kẻ đang nhìn mình từ bên trong cái xác ấy… là Quỷ Nhập Tràng đang học cách làm người."
    },
    {
        id: "than-vong",
        name: "Thần Vòng",
        group: "ma",
        groupLabel: "Ma",
        image: "/images/cards/than-vong.jpg",
        functionText: "Gọi tên người yếu lòng lúc đêm khuya, bám vào nỗi buồn và rủ họ đi theo.",
        story: "Oán hồn bên sợi dây thắt cổ\nỞ Định Yên, người ta sợ nhất không phải tiếng khóc trong đám tang, mà là lúc cái khóc ấy bỗng dưng im bặt giữa đêm.\nIm tới mức nghe được tiếng nhang cháy lách tách trên bàn thờ, nghe được tiếng gió lùa qua vách lá, và nghe rõ đâu đó sau hè có một sợi dây cũ đang đong đưa kẽo kẹt, dù ngoài trời chẳng có lấy một cơn gió.\nBà con gọi thứ đó là Thần Vòng. Có nơi gọi là Ma Thắt Cổ.\nNgười già ở Định Yên kể rằng, Thần Vòng thường sinh ra từ những cái chết tức tưởi, chết oan, chết khi trong lòng còn nghẹn một mối hận không kịp nói. Người chết chưa chịu đi, oan khí còn vướng lại nơi cổ, nơi xà nhà, nơi góc vườn tối, nơi từng có một sợi dây buông xuống trong đêm. Lâu ngày, nỗi uất ấy không tan, mà cuộn lại thành một cái bóng biết đi tìm người thế chỗ.\nThần Vòng không hiện ra ồn ào. Nó đến rất chậm.\nBan đầu chỉ là cảm giác nặng cổ khi bước ngang chỗ cũ. Một luồng lạnh bò từ gáy xuống sống lưng. Một tiếng gọi nhỏ sau lưng, nghe giống người quen vừa mất. Có khi là tiếng dép lê quanh nhà lúc nửa đêm. Có khi là tiếng ai đứng ngoài hiên thở dài. Có khi là tiếng dây cọ nhẹ vào cây cột, kẽo kẹt từng nhịp, đều đều như có người đang đếm giờ.\nNhứt là vào Canh Ba.\nKhi chợ Định Yên đã vắng tiếng người, đèn dầu ngoài sạp chỉ còn leo lét, sương từ mé sông bò lên trắng bờ, Thần Vòng sẽ men theo hơi lạnh mà trở về. Nó thường đứng ở những chỗ khuất: sau nhà, dưới gốc cây già, bên hông miếu nhỏ, hoặc cạnh mấy căn chòi bỏ hoang gần chợ. Ai yếu vía đi ngang sẽ thấy trên cao có một cái bóng dài lơ lửng, tóc rũ xuống, mặt cúi gằm, chân không chạm đất.\nNhưng đáng sợ nhất không phải là nhìn thấy nó. Mà là nghe nó gọi.\nNó không gọi lớn. Nó chỉ gọi tên người ta rất khẽ, như sợ đánh thức cả làng. Tiếng gọi ấy buồn lắm, nghẹn lắm, giống như người thân đang tủi phận mà than sau vách. Ai nghe rồi mềm lòng quay lại, Thần Vòng sẽ bắt đầu theo. Đi đâu cũng nghe tiếng dây đong đưa. Ngủ cũng thấy nặng cổ. Ăn cơm cũng thấy sau lưng có người đứng nhìn. Càng cố quên, tiếng gọi càng gần.\nNgười bị Thần Vòng ám thường đổi tính trước. Đang vui bỗng lặng thinh. Đang khỏe bỗng mệt mỏi, mắt thâm quầng, miệng cứ nói những câu kỳ lạ như “ngoài kia có người chờ tui”, hoặc “đừng để người đó đứng một mình”. Có người nửa đêm bật dậy đi ra sân, đứng im dưới mái hiên, ngửa mặt nhìn lên xà nhà như đang nghe ai chỉ đường.\nBà con nói, Thần Vòng không chỉ hù người. Nó rủ người đi theo nó.\nVì cái chết oan không chịu nằm yên, nó cứ quanh quẩn ở chỗ cũ, tìm một người có nỗi buồn giống mình, một người đang yếu lòng, một người trong nhà đang có tang, một người vô tình nghe thấy tiếng gọi lúc đêm khuya. Nó bám vào nỗi buồn của người sống, làm cho nỗi buồn ấy nặng thêm, tối thêm, lạnh thêm, cho tới khi người đó không còn phân biệt được đâu là tiếng lòng mình, đâu là tiếng ma gọi.\nỞ Chợ Định Yên, Thần Vòng hay xuất hiện vào những đêm có đám tang chết bất thường. Khi phiên chợ Canh Ba mở ra, nó lẫn trong đám bóng người đi chợ, cổ cúi thấp, tay cầm một đoạn dây cũ kéo lê trên đất. Nó không mua gì, không nói chuyện với ai, chỉ đứng ở mép sạp, nhìn những người còn sống bằng đôi mắt đỏ hoe như vừa khóc cạn nước mắt.\nNếu ai nhìn nó quá lâu, người đó sẽ thấy cổ mình nghẹn lại. Như có thứ gì vô hình vừa siết nhẹ. Người Định Yên dặn nhau: nhà có tang thì đừng để người yếu vía thức canh một mình. Đêm khuya nghe ai gọi tên từ sau hè thì đừng trả lời. Thấy sợi dây cũ đong đưa trong gió lặng thì tránh xa. Và nếu đang đi giữa chợ Canh Ba mà nghe tiếng kẽo kẹt trên đầu, tuyệt đối đừng ngước lên nhìn.\n Vì có khi phía trên không có mái nhà.Cũng không có cành cây. Chỉ có Thần Vòng đang cúi xuống, chờ coi ai là người kế tiếp nghe được tiếng gọi của nó."
    },
    {
        id: "thien-linh-cai",
        name: "Thiên Linh Cái",
        group: "ma",
        groupLabel: "Ma",
        image: "/images/cards/thien-linh-cai.jpg",
        functionText: "Tà thuật dùng linh hồn chết oan làm vật sai khiến, có thể mê hoặc, giữ người hoặc hại người.",
        story: "Tà thuật dưới ghe thầy thuốc\nỞ Định Yên, người ta sợ ma hiện hình đã đành, nhưng còn sợ hơn những kẻ mang mặt người mà trong lòng nuôi quỷ.\nNhiều năm trước, có một người đàn ông lạ chèo ghe cập bến ven làng. Ông ta tự xưng là thầy thuốc, nói mình đi khắp miệt sông nước để bốc thuốc cứu người. Chiếc ghe của ông neo dưới rặng bần sau chợ, ban ngày đóng cửa im lìm, ban đêm chỉ thấy một đốm đèn dầu leo lét hắt ra từ mui ghe, vàng vọt như mắt ai đang thức.\nBan đầu, chẳng mấy ai dám tới. Nhưng rồi có người bệnh uống thuốc của ông thấy đỡ, có bà đau lưng được ông xoa dầu, cho thuốc mà không lấy một đồng. Ở cái xứ nghèo, gặp một ông thầy biết chữa bệnh lại chẳng màng tiền bạc, bà con thương lắm. Người ta gọi ông là thầy Hai\nThầy Hai nói chuyện nhẹ nhàng, miệng lúc nào cũng cười hiền. Đi đám nào cũng mặc áo bà ba trắng, tóc râu dài, tay lần chuỗi, miệng nói toàn chuyện tu thân, tích đức. Mâm cao cỗ đầy bày trước mặt, thịt cá, rượu chè ê hề, ông chỉ xin chén cơm trắng với chút nước tương. Ai hỏi, ông cười xòa: “Thầy ăn chay trường, giữ thân sạch để giúp người đời.”\nBởi vậy, dân làng càng tin.\nNhứt là đàn bà con gái.\nNgười thì tới xin thuốc. Người thì xin bùa giữ chồng. Người thì mong có duyên lành, mong chồng thương, mong người mình thương quay đầu ngó lại. Thầy Hai nói mấy chuyện đó ngọt như rót mật vô tai. Ông bảo bùa của ông không phải bùa hại người, mà là bùa cầu duyên, bùa hộ thân, bùa nhờ âm binh thiên tướng phù trợ.\nCó người hỏi nhỏ, nghe đồn thầy luyện Thiên Linh Cái phải không.\nThầy Hai chỉ cười, mắt khép hờ, nói giọng đều đều: “Thiên linh cũng có thiện, có ác. Người tâm sáng thì dùng để cứu đời. Người tâm tà mới dùng để hại người.”\nNghe vậy, ai cũng yên lòng.\nNhưng từ ngày chiếc ghe ấy neo lại bến Định Yên, trong làng bắt đầu có những chuyện lạ.\nĐêm nào trăng tối, sau chợ lại nghe tiếng gõ nồi lộc cộc từ phía bờ sông. Có khi mùi nhang tàn lẫn mùi thuốc bắc bay lên nồng nặc. Có khi người ta thấy thầy Hai đội nón lá, xách cái nồi lớn đi ngang qua bến lúc khuya, dáng đi chậm rãi, cái bóng kéo dài trên mặt đất như không phải bóng người.\nÔng thường mượn dân làng những cái nồi thật to. Hỏi để làm gì, ông nói nấu lễ vật cúng binh gia, cúng âm linh, cúng những vong hồn đi theo giúp thầy trị bệnh. Người dân quê thiệt thà, nghe thầy nói vậy cũng không nghi. Có nhà còn mừng vì được thầy nhớ tới, sẵn lòng cho mượn nồi, cho mượn củi, cho cả gà vịt để làm lễ.\nNhưng kỳ lạ là những món thầy đem biếu lại, chẳng mấy ai dám ăn.\nKhông phải vì không ngon.\nMà vì nó có mùi lạ.\nMột thứ mùi tanh âm ẩm, lẫn trong khói nhang, bám vô cổ họng làm người ta muốn ói. Bà con chỉ nghĩ chắc lễ âm phần nên nặng mùi, đành đem bỏ sau vườn hoặc thả trôi sông, chớ không ai dám hỏi thêm.\nCàng về sau, đàn bà con gái tới ghe thầy càng nhiều.\nNhưng thầy Hai đặt ra một lệ rất lạ: ai muốn xin bùa thiêng thì phải đi một mình, tới vào giờ âm, lúc người trong làng đã ngủ hết. Thầy nói ban ngày dương khí nặng, âm binh không nghe lệnh. Phải đợi khuya, khi nước sông đứng lại, khi chó trong xóm không còn sủa, khi đèn chợ tắt gần hết, bùa mới linh.\nCó người kể, muốn vào chỗ thầy làm phép thì không được đi bằng cửa chính. Phải bò thấp người, lách qua hàng rào sau, rồi lần mò dưới gầm sàn mà chui lên. Thầy bảo đó là phép “hạ mình trước âm binh”, ai thành tâm thì bùa mới ứng.\nNghe thì kỳ quặc.\nNhưng người đang khổ vì tình, vì bệnh, vì nghèo, vì cô quạnh, thường dễ tin vào những lời có vẻ huyền bí. Họ tin thầy. Tin chiếc ghe im lìm dưới rặng bần. Tin mấy lá bùa đỏ được gấp kỹ trong vải. Tin rằng ở dưới lớp nước đen kia thật sự có thiên binh thiên tướng đang nghe lệnh ông.\nRồi một đêm, có người mất tích.\nBan đầu, cả làng còn nghĩ cô gái ấy bỏ xứ theo người thương. Nhưng rồi thêm một người nữa không về. Rồi thêm một người nữa. Những người từng lui tới ghe thầy, từng đi một mình lúc khuya, từng xin bùa cầu duyên, cứ lần lượt biến mất như bị sương đêm nuốt mất.\nMỗi lần có người mất tích, chiếc ghe của thầy Hai lại đóng kín mấy ngày.\nKhông ai thấy ông bốc thuốc.\nKhông ai thấy ông ra chợ.\nChỉ tới khuya mới nghe từ dưới bến vọng lên tiếng nước vỗ lụp bụp vào mạn ghe, tiếng nồi sôi ùng ục, tiếng thầy lầm rầm khấn vái. Mấy con chó trong xóm cứ tới gần bến là cụp đuôi, tru lên từng hồi rồi chạy mất.\nNgười già trong làng bắt đầu nghi.\nHọ nói, thứ thầy Hai luyện không phải bùa lành.\nMà là Thiên Linh Cái.\nNgười ta đồn rằng, Thiên Linh Cái là thứ tà thuật lấy linh hồn chết oan làm vật sai khiến. Một khi luyện thành, nó có thể nghe lời chủ, giúp gọi âm binh, khiến người khác mê muội, làm bùa yêu, bùa giữ người, bùa hại người. Nhưng cái giá để nuôi thứ đó không bao giờ sạch sẽ. Nó cần máu, cần oán, cần một linh hồn bị giữ lại giữa lằn ranh sống chết.\nTừ đó, chiếc ghe thầy Hai không còn được nhìn bằng con mắt kính trọng nữa.\nBan ngày, bến sông vẫn lặng. Lục bình vẫn trôi. Tiếng rao ngoài chợ vẫn vang như thường. Nhưng cứ tới Canh Ba, bà con Định Yên lại thấy dưới mui ghe có ánh đèn đỏ hắt lên, chớp tắt từng nhịp như có ai đang thở. Trên nóc ghe, khói nhang cuộn lại thành hình một cái đầu nhỏ xíu, tóc rũ xuống, rồi tan mất trong sương.\nCó người đi chợ khuya kể rằng, họ từng nghe tiếng con gái khóc dưới lòng ghe.\nTiếng khóc bị bịt lại.\nNhỏ thôi.\nNhưng nghe oán tới rợn người.\nĐêm đó, người ấy chạy một mạch về nhà, mấy ngày sau phát sốt, cứ lẩm bẩm: “Nó còn mở mắt… nó còn nhìn tui…”\nKhi sự thật bị phanh ra, dân làng mới hiểu vì sao thầy Hai hay mượn nồi lớn. Vì sao đêm nào ghe cũng đóng kín. Vì sao những món lễ vật ông đem biếu có mùi tanh lạnh. Và vì sao những cô gái từng tin lời thầy lại một đi không trở về.\nNhưng lúc đó, mọi chuyện đã quá muộn.\nNgười ta kéo nhau ra bến, chiếc ghe thầy Hai vẫn neo đó, im lìm như chưa từng có chuyện gì. Bên trong chỉ còn khói nhang, bùa chú, mấy vệt đen bám trên ván gỗ, và một cái lạnh thấm vô da thịt. Thầy Hai biến mất. Không ai biết ông trốn đi đâu, cũng không ai biết thứ ông luyện đã bị phá hay vẫn còn quanh quẩn đâu đó trong làng.\nChỉ biết từ đó, bến sông sau chợ Định Yên không còn yên nữa.\nMỗi khi đêm xuống, nhất là vào Canh Ba, người ta thỉnh thoảng vẫn nghe tiếng nồi sôi dưới bến. Có khi trong sương hiện ra bóng một người đàn ông mặc áo bà ba trắng, đứng quay lưng về phía chợ, tay ôm một vật gì đó trước ngực. Có khi lại thấy một bóng con gái tóc dài ngồi trên mui ghe cũ, đầu cúi thấp, vai run run như đang khóc.\nBà con dặn nhau: đêm khuya đừng tới bến một mình. Gặp người lạ tự xưng thầy thuốc thì đừng vội tin. Ai cho bùa giữ duyên, bùa gọi tình, bùa đổi mạng thì phải tránh xa. Nhất là nếu người đó bắt mình đi một mình vào giờ âm, chui qua lối khuất, bước vào căn nhà đóng kín đèn nhang, thì phải quay đầu liền.\nVì có những thứ bùa không giữ được tình.\nChỉ giữ được hồn người chết.\nVà trong phiên chợ Canh Ba, nếu nghe dưới bến có tiếng ai lầm rầm khấn vái, kèm theo mùi nhang tàn pha với mùi tanh lạnh bốc lên từ mặt nước, thì đừng đứng lại nghe.\nBiết đâu thầy Hai chưa từng rời khỏi Định Yên.\nCòn thứ nằm trong bóng tối dưới chiếc ghe kia…\nvẫn đang chờ một người nhẹ dạ bước xuống để hoàn thành lá bùa cuối cùng."
    }
];

function getGroupCount(group: CardGroup) {
    if (group === "all") return cards.length;
    return cards.filter((card) => card.group === group).length;
}

function normalizeText(value: string) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase()
        .trim();
}

function tokenize(value: string) {
    return normalizeText(value)
        .split(/\s+/)
        .filter(Boolean);
}

function getSearchScore(card: GameCard, keyword: string) {
    const query = normalizeText(keyword);

    if (!query) return 100;

    const queryWords = tokenize(query);

    const name = normalizeText(card.name);
    const id = normalizeText(card.id.replaceAll("-", " "));
    const group = normalizeText(card.groupLabel);
    const functionText = normalizeText(card.functionText);

    // Ưu tiên cao nhất: tên thẻ
    if (name === query) return 100;
    if (name.startsWith(query)) return 95;
    if (name.includes(query)) return 85;

    // Gõ không dấu theo id: ma doi, den dau, ong tu...
    if (id === query) return 98;
    if (id.startsWith(query)) return 90;
    if (id.includes(query)) return 80;

    // Tất cả từ khóa đều nằm trong tên hoặc id
    const allWordsInNameOrId = queryWords.every(
        (word) => name.includes(word) || id.includes(word)
    );

    if (allWordsInNameOrId) return 75;

    // Search theo nhóm: ma, dan lang, bao vat
    if (group === query) return 65;
    if (group.includes(query)) return 55;

    // Phụ trợ: chỉ search chức năng, không search story vì story quá dài gây nhiễu
    const allWordsInFunction = queryWords.every((word) =>
        functionText.includes(word)
    );

    if (allWordsInFunction) return 35;

    return 0;
}

export default function ProductCardLibrary() {
    const [activeGroup, setActiveGroup] = useState<CardGroup>("all");
    const [search, setSearch] = useState("");
    const [selectedCard, setSelectedCard] = useState<GameCard | null>(null);

    const filteredCards = useMemo(() => {
        const keyword = search.trim();

        return cards
            .map((card) => ({
                card,
                score: getSearchScore(card, keyword),
            }))
            .filter(({ card, score }) => {
                const matchGroup = activeGroup === "all" || card.group === activeGroup;
                const matchSearch = keyword.length === 0 || score > 0;

                return matchGroup && matchSearch;
            })
            .sort((a, b) => b.score - a.score)
            .map(({ card }) => card);
    }, [activeGroup, search]);

    return (
        <section
            id="card-library"
            className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
        >
            <div className="mb-6 rounded-[50px] border border-white/10 bg-[#181818] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.28)] sm:p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <div className="inline-flex rounded-full bg-[#ffae17]/12 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-[#ffae17]">
                            Card Library
                        </div>

                        <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[#f2f2f2] sm:text-3xl">
                            Tất cả thẻ bài
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm leading-7 text-[#a7a7a7]">
                            Lọc theo nhóm thẻ hoặc tìm nhanh bằng tên thẻ. Bấm vào từng thẻ để
                            xem chức năng và câu chuyện chi tiết.
                        </p>
                    </div>

                    <div className="w-full lg:max-w-md">
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Tìm theo tên thẻ..."
                            className="h-12 w-full rounded-full border border-white/10 bg-[#101010] px-5 text-sm font-semibold text-[#f2f2f2] outline-none placeholder:text-[#777] focus:border-[#ffae17]/70"
                        />
                    </div>
                </div>

                <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                    {filters.map((filter) => {
                        const active = activeGroup === filter.id;

                        return (
                            <button
                                key={filter.id}
                                type="button"
                                onClick={() => setActiveGroup(filter.id)}
                                className={[
                                    "shrink-0 rounded-full px-4 py-2 text-xs font-black transition sm:text-sm",
                                    active
                                        ? "bg-[#ffae17] text-[#111111]"
                                        : "border border-white/10 bg-[#252525] text-[#a7a7a7] hover:bg-[#303030] hover:text-[#f2f2f2]",
                                ].join(" ")}
                            >
                                {filter.label}
                                <span className="ml-2 opacity-70">
                                    {getGroupCount(filter.id)}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mb-5 flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-[#a7a7a7]">
                    Đang hiển thị{" "}
                    <span className="font-black text-[#ffae17]">
                        {filteredCards.length}
                    </span>{" "}
                    thẻ bài
                </p>

                {search || activeGroup !== "all" ? (
                    <button
                        type="button"
                        onClick={() => {
                            setSearch("");
                            setActiveGroup("all");
                        }}
                        className="rounded-full border border-white/10 bg-[#1f1f1f] px-4 py-2 text-xs font-bold text-[#f2f2f2] transition hover:bg-[#292929]"
                    >
                        Xóa lọc
                    </button>
                ) : null}
            </div>

            {filteredCards.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredCards.map((card) => (
                        <button
                            key={card.id}
                            type="button"
                            onClick={() => setSelectedCard(card)}
                            className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#181818] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.32)] transition duration-300 hover:-translate-y-1 hover:border-[#ffae17]/35 hover:bg-[#202020]"
                        >
                            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[30px] bg-[#0f0f0f] shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
                                <Image
                                    src={card.image}
                                    alt={card.name}
                                    fill
                                    className="object-cover p-[2.5px] transition duration-500 group-hover:scale-[1.025]"
                                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 36vw, 250px"
                                />
                            </div>

                            <div className="flex justify-center pt-4">
                                <span className="inline-flex rounded-full bg-[#252525] px-5 py-2.5 text-xs font-black text-[#f2f2f2] transition group-hover:bg-[#ffae17] group-hover:text-[#111111]">
                                    Xem chi tiết
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="rounded-[30px] border border-white/10 bg-[#191919] p-8 text-center">
                    <div className="text-2xl font-black text-[#f2f2f2]">
                        Không tìm thấy thẻ phù hợp
                    </div>

                    <p className="mt-3 text-sm text-[#a7a7a7]">
                        Thử đổi từ khóa hoặc chọn lại nhóm thẻ khác.
                    </p>
                </div>
            )}

            {selectedCard ? (
                <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
                    <div className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[34px] border border-white/10 bg-[#191919] shadow-[0_30px_100px_rgba(0,0,0,0.65)]">
                        <button
                            type="button"
                            onClick={() => setSelectedCard(null)}
                            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-xl font-black text-white transition hover:bg-[#ffae17] hover:text-[#111111]"
                            aria-label="Đóng"
                        >
                            ×
                        </button>

                        <div className="grid gap-0 md:grid-cols-[0.85fr_1.15fr]">
                            <div className="bg-[#111111] p-6 sm:p-8">
                                <div className="relative mx-auto aspect-[3/4] w-full max-w-[330px] overflow-hidden rounded-[26px] border border-white/10 bg-[#101010] shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
                                    <Image
                                        src={selectedCard.image}
                                        alt={selectedCard.name}
                                        fill
                                        className="object-contain p-2"
                                        sizes="330px"
                                    />
                                </div>
                            </div>

                            <div className="p-6 sm:p-8 lg:p-10">
                                <div className="mb-4">
                                    <span className="rounded-full bg-[#ffae17] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#111111]">
                                        {selectedCard.groupLabel}
                                    </span>
                                </div>

                                <h3 className="text-[38px] font-black leading-tight tracking-[-0.05em] text-[#f2f2f2] sm:text-5xl">
                                    {selectedCard.name}
                                </h3>

                                <div className="mt-8 rounded-[24px] border border-white/10 bg-[#111111] p-5">
                                    <div className="text-sm font-black uppercase tracking-[0.16em] text-[#ffae17]">
                                        Chức năng
                                    </div>

                                    <p className="mt-3 text-base leading-8 text-[#f2f2f2]">
                                        {selectedCard.functionText}
                                    </p>
                                </div>

                                {selectedCard.story ? (
                                    <div className="mt-5 rounded-[24px] border border-white/10 bg-[#111111] p-5">
                                        <div className="text-sm font-black uppercase tracking-[0.16em] text-[#ffae17]">
                                            Câu chuyện nhân vật
                                        </div>

                                        <div className="mt-4 max-h-[360px] overflow-y-auto pr-2 text-sm leading-7 text-[#a7a7a7]">
                                            {selectedCard.story
                                                .split("\n")
                                                .filter(Boolean)
                                                .map((paragraph) => (
                                                    <p key={paragraph} className="mb-4 last:mb-0">
                                                        {paragraph}
                                                    </p>
                                                ))}
                                        </div>
                                    </div>
                                ) : null}

                                <button
                                    type="button"
                                    onClick={() => setSelectedCard(null)}
                                    className="mt-6 inline-flex h-13 items-center justify-center rounded-full bg-[#ffae17] px-7 text-sm font-black text-[#111111] transition hover:brightness-95"
                                >
                                    Đóng chi tiết
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </section>
    );
}