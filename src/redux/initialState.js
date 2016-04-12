import constants from './constants'

export default function() {
	var now = new Date().toISOString();
	return {
		requestStatus: constants.REQUESTING,
		searchTerm: '',
		questions: [{
				id: 0,
				approvalStatus: constants.QUESTION_PENDING,
				title: "Ask a question",
				submitTime: now , 
				answer:  "",
				editingAnswer: true,
				editingQuestion: true,
				submitter: "You",
				upvotes: 0				
			},
			{
				id: 1,
				approvalStatus: constants.QUESTION_PENDING,
				title: "I need to know: are the intonations and inflections in your father's voice real or scripted? Both of your parents were great!",
				submitTime: now , 
				answer:  'Yeah, same with my mom. When she goes "STOP THAT!" that\'s exactly how she yells at my dad IRL. And when she told me that "sat on the couch and cried" story in real life, it was in that exact same deadpan tone.',
				editingAnswer: true,
				editingQuestion: true,
				submitter: "ThePotholeHotline",
				upvotes: 33				
			},
			{
				id: 2,
				approvalStatus: constants.QUESTION_PENDING,
				title: "I'm really loving your show, and I wanted to ask about the trip to Nashville episode. Did you ever take a girl for a 1st date to a different city? It sounds crazy! Like what if there was no chemistry or the other person sucks?",
				submitTime: now , 
				answer:  'One of our writers had that experience and it fit with my "Monster Truck Rally Theory" from the book, so seemed perfect. Also loved going to Nashville so we could use that country music and I could eat at Arnold\'s Country Kitchen.',
				editingAnswer: true,
				editingQuestion: true,
				submitter: "i_am_thoms_meme",
				upvotes: 5				
			},
			{
				id: 3,
				approvalStatus: constants.QUESTION_PENDING,
				title: "Aziz, when can we expect season 2? My roommate and me can't get enough.",
				submitTime: now , 
				answer:  "We haven't heard officially from Netflix. But Alan and I, like true Asians, have started an insane chain of ideas already. The show came out less than a week ago. We really have been inspired by the massive reaction to the show.",
				editingAnswer: true,
				editingQuestion: true,
				submitter: "Obie_Trice_Kenobi",
				upvotes: 8				
			},
			{
				id: 4,
				approvalStatus: constants.QUESTION_PENDING,
				title: "How does a New York-based actor in commercials end up with such a nice apartment?",
				submitTime: now , 
				answer:  "It is so weird and awesome seeing people quote the show. Yeah, we agreed Dev should have decent money from his commercials (Gogurt, Wendy's voiceover, Garden Depot) and national commercials actually pay a decent amount. (I based this kind of on Rob Huebel who was doing pretty well during his Inconsiderate Cellphone/NetZero days). We mainly did this to differentiate from the other other New York shows where characters are younger and not doing as well work wise. Also Dev is in a cheaper neighborhood and our production designer Amy Williams was very conscious about the stuff she bought for Dev.",
				editingAnswer: true,
				editingQuestion: true,
				submitter: "rosiefrank",
				upvotes: 11				
			},
			{
				id: 5,
				approvalStatus: constants.QUESTION_PENDING,
				title: "Aziz, what's the best pasta you've ever had in your life (so far)?",
				submitTime: now , 
				answer:  "That pasta on Dev's fridge is a pasta I really ate in Rome. It was tollerini alla gricia (I think?). Also I just went to Bologna and loved the tortellini en brodo I had there. Holy shit.",
				editingAnswer: true,
				editingQuestion: true,
				submitter: "giraffacamelopardal",
				upvotes: 6				
			},
			{
				id: 6,
				approvalStatus: constants.QUESTION_PENDING,
				title: "Aziz and Alan - loved the show! I'm curious what made Netflix a more appealing option for the show rather than a traditional TV network? Loved being able to watch the whole season in one day, but what made you decide Netflix was the best medium to reach your audience? Did other networks make an offer?",
				submitTime: now , 
				answer:  "We pitched only to premium spots cause we didn't want to deal with content issues. (Example: The show opens with Rachel and I talking about jizz/precum.) On Netflix, we never had one issue with content. Also, no need to edit to commercials. Most importantly though, Netflix really believed in us and told us they wanted to go straight to series and do 10 episodes. No pilot/development process. It was a great experience. Also, I love how everyone has gotten to just see all the episodes, rather than wait 9 weeks until someone can see an episode I really am proud of like Mornings.",
				editingAnswer: true,
				editingQuestion: true,
				submitter: "funnyleaves",
				upvotes: 10				
			},
			]
	}
}
