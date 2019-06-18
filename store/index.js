import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const state = () => {
    return {
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
    fetchList({ commit }, params = {}) {
        if (!params.page) params.page = 1;
        commit('updateListStatus', true);
        const isLoadMore = params.page && params.page > 1
        return this.$axios.$post(`/list`, params)
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
    // 获取文章列表
    fetchListDetail({ commit }, params = {}) {
        return this.$axios.$post(`/list/detail`, params)
            .then(res => {
                console.log(res);
                commit('updateListDetail', res.data);
            })
            .catch(err => { })
    }
}
