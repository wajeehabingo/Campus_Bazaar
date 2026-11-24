using System;
using System.Collections.Generic;
using CampusBazaar.DSA.Models;

namespace CampusBazaar.DSA.Algorithms
{
    public static class ResourceSorter
    {
        // Generic Merge Sort: O(n log n) time, O(n) space, stable sort
        public static List<T> MergeSort<T>(IReadOnlyList<T> items, Comparison<T> comparison)
        {
            ArgumentNullException.ThrowIfNull(items);
            ArgumentNullException.ThrowIfNull(comparison);

            if (items.Count <= 1)
            {
                return new List<T>(items);
            }

            int mid = items.Count / 2;

            var leftInput = new List<T>(mid);
            for (int i = 0; i < mid; i++)
            {
                leftInput.Add(items[i]);
            }

            var rightInput = new List<T>(items.Count - mid);
            for (int i = mid; i < items.Count; i++)
            {
                rightInput.Add(items[i]);
            }

            var leftSorted = MergeSort(leftInput, comparison);
            var rightSorted = MergeSort(rightInput, comparison);

            return Merge(leftSorted, rightSorted, comparison);
        }

        private static List<T> Merge<T>(List<T> left, List<T> right, Comparison<T> comparison)
        {
            var merged = new List<T>(left.Count + right.Count);
            int i = 0;
            int j = 0;

            while (i < left.Count && j < right.Count)
            {
                if (comparison(left[i], right[j]) <= 0)
                {
                    merged.Add(left[i]);
                    i++;
                }
                else
                {
                    merged.Add(right[j]);
                    j++;
                }
            }

            while (i < left.Count)
            {
                merged.Add(left[i]);
                i++;
            }

            while (j < right.Count)
            {
                merged.Add(right[j]);
                j++;
            }

            return merged;
        }

        // --- Sorting Helpers ---

        public static List<ResourceItem> SortByDownloadsDescending(IReadOnlyList<ResourceItem> items)
        {
            return MergeSort(items, (a, b) => b.DownloadCount.CompareTo(a.DownloadCount));
        }

        public static List<ResourceItem> SortByDownloadsAscending(IReadOnlyList<ResourceItem> items)
        {
            return MergeSort(items, (a, b) => a.DownloadCount.CompareTo(b.DownloadCount));
        }

        public static List<ResourceItem> SortByTitleAscending(IReadOnlyList<ResourceItem> items)
        {
            return MergeSort(items, (a, b) =>
                string.Compare(a.Title, b.Title, StringComparison.OrdinalIgnoreCase));
        }

        public static List<ResourceItem> SortByNewestFirst(IReadOnlyList<ResourceItem> items)
        {
            return MergeSort(items, (a, b) => b.UploadDate.CompareTo(a.UploadDate));
        }

        // --- Filtering Helpers ---

        public static List<ResourceItem> FilterByCourseCode(IEnumerable<ResourceItem> items, string courseCode)
        {
            ArgumentNullException.ThrowIfNull(items);
            if (string.IsNullOrWhiteSpace(courseCode))
            {
                return new List<ResourceItem>();
            }

            return Filter(items, r =>
                string.Equals(r.CourseCode?.Trim(), courseCode.Trim(), StringComparison.OrdinalIgnoreCase));
        }

        public static List<ResourceItem> FilterByFileType(IEnumerable<ResourceItem> items, string fileType)
        {
            ArgumentNullException.ThrowIfNull(items);
            if (string.IsNullOrWhiteSpace(fileType))
            {
                return new List<ResourceItem>();
            }

            return Filter(items, r =>
                string.Equals(r.FileType?.Trim(), fileType.Trim(), StringComparison.OrdinalIgnoreCase));
        }

        public static List<ResourceItem> FilterByMinDownloads(IEnumerable<ResourceItem> items, int minDownloads)
        {
            ArgumentNullException.ThrowIfNull(items);
            return Filter(items, r => r.DownloadCount >= minDownloads);
        }

        public static List<T> Filter<T>(IEnumerable<T> items, Func<T, bool> predicate)
        {
            ArgumentNullException.ThrowIfNull(items);
            ArgumentNullException.ThrowIfNull(predicate);

            var matches = new List<T>();
            foreach (var item in items)
            {
                if (predicate(item))
                {
                    matches.Add(item);
                }
            }

            return matches;
        }
    }
}