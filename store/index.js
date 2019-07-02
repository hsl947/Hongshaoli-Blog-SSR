import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => {
    return {
        admin_token: process.client?localStorage.getItem('admin_token') : '',
        list: {
            data: [],
            loading: true,
            finished: false,
            page: 1
        },
        details: {}
    }
}

export const mutations = {
    getToken(state, token) {
        if (process.client){
            let token = localStorage.getItem('admin_token');
            state.admin_token = token;
        } 
    },
    setToken(state, token) {
        state.admin_token = token;
        if (process.client) localStorage.setItem('admin_token', token);
    },
    delToken(state) {
        state.admin_token = ''
        if (process.client) localStorage.setItem('admin_token', '');     
    },
    // 文章列表
    updateListData(state, action) {
        state.list.data = action.data
    },
    updateExistingListData(state, action) {
        state.list.data.push(...action.data)
        state.list.page = action.page
    },
    updateListStatus(state, action) {
        state.list.loading = action
    },
    updateListEnd(state, action) {
        state.list.finished = action
    },
    updateListDetail(state, action) {
        state.list.details = action
    }
}

export const actions = {
    // 获取文章列表
    async fetchList({ commit }, params = {}) {
        params.page ? params.page : params.page = 1;
        commit('updateListStatus', true);
        const isLoadMore = params.page && params.page > 1
        return await this.$axios.$post(`/list`, params)
            .then(res => {
                commit('updateListStatus', false);
                if (!res.total){
                    commit('updateListEnd', true);
                    return;
                } 
                isLoadMore 
                    ? commit('updateExistingListData', res) 
                    : commit('updateListData', res);
            })
            .catch(err => {})
    },
    // 获取文章详情
    async fetchListDetail({ commit }, params = {}) {
        return await this.$axios.$post(`/list/detail`, params)
            .then(res => {
                commit('updateListDetail', res.data);
            })
            .catch(err => {
                this.$router.replace({
                    path: '/404'
                });
            })
    },
    // 获取文章详情
    async updateListNum({ commit }, params = {}) {
        return await this.$axios.$post(`/list/view`, params)
            .then(res => {
                
            })
            .catch(err => {
                
            })
    }
}
