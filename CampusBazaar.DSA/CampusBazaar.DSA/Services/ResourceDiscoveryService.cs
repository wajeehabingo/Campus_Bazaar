using System;
using System.Collections.Generic;
using CampusBazaar.DSA.Algorithms;
using CampusBazaar.DSA.DataStructures;
using CampusBazaar.DSA.Models;

namespace CampusBazaar.DSA.Services
{
    public class ResourceDiscoveryService
    {
        private readonly ResourceRepository _repository;
        private readonly Trie _titleTrie;

        public ResourceDiscoveryService(ResourceRepository repository, Trie titleTrie)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _titleTrie = titleTrie ?? throw new ArgumentNullException(nameof(titleTrie));
        }

        // Adds to O(1) hash repository and indexes title in the Trie together
        public void AddResource(ResourceItem item)
        {
            ArgumentNullException.ThrowIfNull(item);

            _repository.AddResource(item);
            _titleTrie.IndexTitle(item.Title, item.Id);
        }

        // O(1) lookup by ID
        public ResourceItem? GetById(int id)
        {
            return _repository.GetResourceById(id);
        }

        // Prefix search via Trie + O(1) fetch from Repository
        public List<ResourceItem> SearchByTitlePrefix(string prefix)
        {
            var matches = new List<ResourceItem>();
            if (string.IsNullOrWhiteSpace(prefix))
            {
                return matches;
            }

            List<int> matchedIds = _titleTrie.SearchPrefix(prefix);
            foreach (int id in matchedIds)
            {
                ResourceItem? item = _repository.GetResourceById(id);
                if (item != null)
                {
                    matches.Add(item);
                }
            }

            return matches;
        }

        // Top-K most downloaded items using a Min-Heap of size K: O(n log K) time, O(K) space
        public List<ResourceItem> GetTopDownloaded(IEnumerable<ResourceItem> items, int topK)
        {
            ArgumentNullException.ThrowIfNull(items);
            if (topK <= 0)
            {
                return new List<ResourceItem>();
            }

            // PriorityQueue in .NET is a min-heap: smaller priority values dequeue first
            var minHeap = new PriorityQueue<ResourceItem, int>();

            foreach (var item in items)
            {
                if (item == null)
                {
                    continue;
                }

                minHeap.Enqueue(item, item.DownloadCount);

                // Keep only the K highest download counts by evicting the lowest one
                if (minHeap.Count > topK)
                {
                    minHeap.Dequeue();
                }
            }

            var topItems = new List<ResourceItem>(minHeap.Count);
            while (minHeap.Count > 0)
            {
                topItems.Add(minHeap.Dequeue());
            }

            // Reverse so highest download count appears first
            topItems.Reverse();
            return topItems;
        }

        // Combine filtering (CourseCode / FileType) + Merge Sort by downloads
        public List<ResourceItem> FilterAndSortByDownloads(
            IEnumerable<ResourceItem> items,
            string? courseCode = null,
            string? fileType = null)
        {
            ArgumentNullException.ThrowIfNull(items);

            var filtered = new List<ResourceItem>();
            foreach (var item in items)
            {
                if (item != null)
                {
                    filtered.Add(item);
                }
            }

            if (!string.IsNullOrWhiteSpace(courseCode))
            {
                filtered = ResourceSorter.FilterByCourseCode(filtered, courseCode);
            }

            if (!string.IsNullOrWhiteSpace(fileType))
            {
                filtered = ResourceSorter.FilterByFileType(filtered, fileType);
            }

            return ResourceSorter.SortByDownloadsDescending(filtered);
        }
    }
}