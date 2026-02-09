import api from './api';

export const aiService = {
    analyzeHousing: async (listingData: any) => {
        const response = await api.post('/ai/analyze-housing', { listing_data: listingData });
        return response.data;
    },

    matchRoommates: async (userProfile: any, candidates: any[]) => {
        const response = await api.post('/ai/roommate-match', { user_profile: userProfile, candidates });
        return response.data;
    },

    searchHostels: async (query: string, filters: any) => {
        const response = await api.post('/ai/hostel-discovery', { query, filters });
        return response.data;
    },

    analyzeLease: async (text: string) => {
        const response = await api.post('/ai/lease-analysis', { text });
        return response.data;
    },

    communityConnect: async (userProfile: any, query: string = "") => {
        const response = await api.post('/ai/community-connect', { user_profile: userProfile, query });
        return response.data;
    },

    askCommunity: async (context: string, question: string) => {
        const response = await api.post('/ai/ask-community', { community_context: context, question });
        return response.data;
    },

    findJobs: async (userProfile: any, query: string = "") => {
        const response = await api.post('/ai/job-finder', { user_profile: userProfile, query });
        return response.data;
    },

    analyzeJobScam: async (text: string) => {
        const response = await api.post('/ai/job-scam-check', { text });
        return response.data;
    },

    analyzeHealthInsurance: async (queryText: string) => {
        const response = await api.post('/ai/health-insurance', { query_text: queryText });
        return response.data;
    },



    getCulturalGuidance: async (data: any) => {
        const response = await api.post('/ai/cultural-guidance', data);
        return response.data;
    },

    culturalDiscovery: async (payload: any) => {
        const response = await api.post('/ai/cultural-discovery', payload);
        return response.data;
    },

    getFinancialGuidance: async (data: any) => {
        const response = await api.post('/ai/financial-guidance', data);
        return response.data;
    },

    analyzeFinancialRisk: async (text: string) => {
        const response = await api.post('/ai/financial-risk', { text });
        return response.data;
    },

    getCommunityRecommendations: async (data: any) => {
        const response = await api.post('/ai/community-recommendations', data);
        return response.data;
    },





    getEmergencySupport: async (inputText: string, language: string = 'en') => {
        const response = await api.post('/ai/emergency-support', { input_text: inputText, language });
        return response.data;
    },

    getAnalytics: async () => {
        const response = await api.get('/ai/analytics');
        return response.data;
    }
};
